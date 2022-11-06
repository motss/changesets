import {
  ChangelogFunctions,
  NewChangesetWithCommit,
} from "@motss-changesets/types";

import { ModCompWithPackage } from "@motss-changesets/types";
import startCase from "lodash.startcase";
import { shouldUpdateDependencyBasedOnConfig } from "./utils";

type ChangelogLines = {
  major: Array<Promise<string>>;
  minor: Array<Promise<string>>;
  patch: Array<Promise<string>>;
};

async function generateChangesForVersionTypeMarkdown(
  obj: ChangelogLines,
  type: keyof ChangelogLines
) {
  let releaseLines = await Promise.all(obj[type]);
  releaseLines = releaseLines.filter((x) => x);
  if (releaseLines.length) {
    return `### ${startCase(type)} Changes\n\n${releaseLines.join("\n")}\n`;
  }
}

// release is the package and version we are releasing
export async function getChangelogEntry(
  release: ModCompWithPackage,
  releases: ModCompWithPackage[],
  changesets: NewChangesetWithCommit[],
  changelogFuncs: ChangelogFunctions,
  changelogOpts: any,
  {
    updateInternalDependencies,
    onlyUpdatePeerDependentsWhenOutOfRange,
  }: {
    updateInternalDependencies: "patch" | "minor";
    onlyUpdatePeerDependentsWhenOutOfRange: boolean;
  }
) {
  if (release.type === "none") return null;

  const changelogLines: ChangelogLines = {
    major: [],
    minor: [],
    patch: [],
  };

  // I sort of feel we can do better, as ComprehensiveReleases have an array
  // of the relevant changesets but since we need the version type for the
  // release in the changeset, I don't know if we can
  // We can filter here, but that just adds another iteration over this list
  changesets.forEach((cs) => {
    const rls = cs.releases.find((r) => r.name === release.name);
    if (rls && rls.type !== "none") {
      changelogLines[rls.type].push(
        changelogFuncs.getReleaseLine(cs, rls.type, changelogOpts)
      );
    }
  });
  let dependentReleases = releases.filter((rel) => {
    const dependencyVersionRange = release.packageJson.dependencies?.[rel.name];
    const peerDependencyVersionRange =
      release.packageJson.peerDependencies?.[rel.name];

    const versionRange = dependencyVersionRange || peerDependencyVersionRange;
    return (
      versionRange &&
      shouldUpdateDependencyBasedOnConfig(
        { type: rel.type, version: rel.newVersion },
        {
          depVersionRange: versionRange,
          depType: dependencyVersionRange ? "dependencies" : "peerDependencies",
        },
        {
          minReleaseType: updateInternalDependencies,
          onlyUpdatePeerDependentsWhenOutOfRange,
        }
      )
    );
  });

  let relevantChangesetIds: Set<string> = new Set();

  dependentReleases.forEach((rel) => {
    rel.changesets.forEach((cs) => {
      relevantChangesetIds.add(cs);
    });
  });

  let relevantChangesets = changesets.filter((cs) =>
    relevantChangesetIds.has(cs.id)
  );

  changelogLines.patch.push(
    changelogFuncs.getDependencyReleaseLine(
      relevantChangesets,
      dependentReleases,
      changelogOpts
    )
  );

  /**
   * NOTE: Workaround to fix release URL for non-monorepos.
   */
  const releaseName = release.name.includes("packages/")
    ? `/${release.name}`
    : "";
  const a = [
    // `## ${release.newVersion}`,
    `## [${release.newVersion}](https://github.com/${changelogOpts.repo}/releases/tag/${releaseName}v${release.newVersion})`,
    await generateChangesForVersionTypeMarkdown(changelogLines, "major"),
    await generateChangesForVersionTypeMarkdown(changelogLines, "minor"),
    await generateChangesForVersionTypeMarkdown(changelogLines, "patch"),
  ]
    .filter((line) => line)
    .join("\n");

  console.debug(
    "getChangelogEntry",
    JSON.stringify(
      {
        release,
        releases,
        changesets,
        changelogOpts,
        updateInternalDependencies,
        onlyUpdatePeerDependentsWhenOutOfRange,
        changelogLines: {
          major: await Promise.all(changelogLines.major),
          minor: await Promise.all(changelogLines.minor),
          patch: await Promise.all(changelogLines.patch),
        },
        a,
      },
      null,
      2
    )
  );

  return a;
}

export default getChangelogEntry;
