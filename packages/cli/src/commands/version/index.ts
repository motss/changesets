import chalk from "chalk";
import path from "path";
import * as git from "@motss-changesets/git";
import { log, warn, error } from "@motss-changesets/logger";
import { Config } from "@motss-changesets/types";
import applyReleasePlan from "@motss-changesets/apply-release-plan";
import { getChangesets } from "@motss-changesets/read";
import { assembleReleasePlan } from "@motss-changesets/assemble-release-plan";
import { getPackages } from "@manypkg/get-packages";

import { readPreState } from "@motss-changesets/pre";
import { ExitError } from "@motss-changesets/errors";
import { getCommitFunctions } from "../../commit/getCommitFunctions";
import { getCurrentCommitId } from "@motss-changesets/git";

let importantSeparator = chalk.red(
  "===============================IMPORTANT!==============================="
);

let importantEnd = chalk.red(
  "----------------------------------------------------------------------"
);

export default async function version(
  cwd: string,
  options: {
    snapshot?: string | boolean;
  },
  config: Config
) {
  console.debug("version");

  const releaseConfig = {
    ...config,
    // Disable committing when in snapshot mode
    commit: options.snapshot ? false : config.commit,
  };
  const [changesets, preState] = await Promise.all([
    getChangesets(cwd),
    readPreState(cwd),
  ]);

  // console.debug(
  //   2,
  //   JSON.stringify(
  //     {
  //       changesets,
  //       preState,
  //     },
  //     null,
  //     2
  //   )
  // );

  if (preState?.mode === "pre") {
    warn(importantSeparator);
    if (options.snapshot !== undefined) {
      error("Snapshot release is not allowed in pre mode");
      log("To resolve this exit the pre mode by running `changeset pre exit`");
      throw new ExitError(1);
    } else {
      warn("You are in prerelease mode");
      warn(
        "If you meant to do a normal release you should revert these changes and run `changeset pre exit`"
      );
      warn("You can then run `changeset version` again to do a normal release");
    }
    warn(importantEnd);
  }

  if (
    changesets.length === 0 &&
    (preState === undefined || preState.mode !== "exit")
  ) {
    warn("No unreleased changesets found, exiting.");
    return;
  }

  const packages = await getPackages(cwd);

  // console.debug(21, packages);

  let releasePlan = assembleReleasePlan(
    changesets,
    packages,
    releaseConfig,
    preState,
    options.snapshot
      ? {
          tag: options.snapshot === true ? undefined : options.snapshot,
          commit: config.snapshot.prereleaseTemplate?.includes("{commit}")
            ? await getCurrentCommitId({ cwd })
            : undefined,
        }
      : undefined
  );

  // console.debug(
  //   22,
  //   JSON.stringify(
  //     {
  //       releasePlan,
  //       releaseConfig,
  //       options,
  //     },
  //     null,
  //     2
  //   )
  // );

  let [...touchedFiles] = await applyReleasePlan(
    releasePlan,
    packages,
    releaseConfig,
    options.snapshot
  );

  // console.debug(
  //   23,
  //   JSON.stringify(
  //     {
  //       touchedFiles,
  //     },
  //     null,
  //     2
  //   )
  // );

  // // eslint-disable-next-line no-constant-condition
  // if (1) return;

  // TODO: unused function
  const [{ getVersionMessage }, commitOpts] = getCommitFunctions(
    releaseConfig.commit,
    cwd
  );

  console.debug("version > getCommitFunctions", {
    getVersionMessage,
    commitOpts,
    releaseConfig,
  });

  if (getVersionMessage) {
    let touchedFile: string | undefined;
    // Note, git gets angry if you try and have two git actions running at once
    // So we need to be careful that these iterations are properly sequential
    while ((touchedFile = touchedFiles.shift())) {
      await git.add(path.relative(cwd, touchedFile), cwd);
    }

    const commit = await git.commit(
      await getVersionMessage(releasePlan, commitOpts),
      cwd
    );

    if (!commit) {
      error("Changesets ran into trouble committing your files");
    } else {
      log(
        "All files have been updated and committed. You're ready to publish!"
      );
    }
  } else {
    log("All files have been updated. Review them and commit at your leisure");
  }
}
