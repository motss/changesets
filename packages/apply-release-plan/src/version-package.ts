import {
  ComprehensiveRelease,
  PackageJSON,
  VersionType,
} from "@motss-changesets/types";
import getVersionRangeType from "@motss-changesets/get-version-range-type";
import semver from "semver";
import { shouldUpdateDependencyBasedOnConfig } from "./utils";

const DEPENDENCY_TYPES = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const;

export default function versionPackage(
  release: ComprehensiveRelease & {
    changelog: string | null;
    packageJson: PackageJSON;
    dir: string;
  },
  versionsToUpdate: Array<{ name: string; version: string; type: VersionType }>,
  {
    updateInternalDependencies,
    onlyUpdatePeerDependentsWhenOutOfRange,
    bumpVersionsWithWorkspaceProtocolOnly,
    snapshot,
  }: {
    updateInternalDependencies: "patch" | "minor";
    onlyUpdatePeerDependentsWhenOutOfRange: boolean;
    bumpVersionsWithWorkspaceProtocolOnly?: boolean;
    snapshot?: string | boolean | undefined;
  }
) {
  let { newVersion, packageJson } = release;

  packageJson.version = newVersion;

  for (let depType of DEPENDENCY_TYPES) {
    let deps = packageJson[depType];
    if (deps) {
      for (let { name, version, type } of versionsToUpdate) {
        let depCurrentVersion = deps[name];
        if (
          !depCurrentVersion ||
          depCurrentVersion.startsWith("file:") ||
          depCurrentVersion.startsWith("link:") ||
          !shouldUpdateDependencyBasedOnConfig(
            { version, type },
            {
              depVersionRange: depCurrentVersion,
              depType,
            },
            {
              minReleaseType: updateInternalDependencies,
              onlyUpdatePeerDependentsWhenOutOfRange,
            }
          )
        ) {
          continue;
        }
        const usesWorkspaceRange = depCurrentVersion.startsWith("workspace:");

        if (
          !usesWorkspaceRange &&
          bumpVersionsWithWorkspaceProtocolOnly === true
        ) {
          continue;
        }

        if (usesWorkspaceRange) {
          const workspaceDepVersion = depCurrentVersion.replace(
            /^workspace:/,
            ""
          );
          if (
            workspaceDepVersion === "*" ||
            workspaceDepVersion === "^" ||
            workspaceDepVersion === "~"
          ) {
            continue;
          }
          depCurrentVersion = workspaceDepVersion;
        }
        if (
          // an empty string is the normalised version of x/X/*
          // we don't want to change these versions because they will match
          // any version and if someone makes the range that
          // they probably want it to stay like that...
          new semver.Range(depCurrentVersion).range !== "" ||
          // ...unless the current version of a dependency is a prerelease (which doesn't satisfy x/X/*)
          // leaving those as is would leave the package in a non-installable state (wrong dep versions would get installed)
          semver.prerelease(version) !== null
        ) {
          let newNewRange = snapshot
            ? version
            : `${getVersionRangeType(depCurrentVersion)}${version}`;
          if (usesWorkspaceRange) newNewRange = `workspace:${newNewRange}`;
          deps[name] = newNewRange;
        }
      }
    }
  }

  return { ...release, packageJson };
}
