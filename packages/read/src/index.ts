import fs from "fs-extra";
import path from "path";
import { parseChangesetFile } from "@motss-changesets/parse";
import { NewChangeset } from "@motss-changesets/types";
import * as git from "@motss-changesets/git";

async function filterChangesetsSinceRef(
  changesets: Array<string>,
  changesetBase: string,
  sinceRef: string
) {
  const newChangesets = await git.getChangedChangesetFilesSinceRef({
    cwd: changesetBase,
    ref: sinceRef,
  });
  const newHashes = newChangesets.map((c) => c.split("/")[1]);

  return changesets.filter((dir) => newHashes.includes(dir));
}

export async function getChangesets(
  cwd: string,
  sinceRef?: string
): Promise<Array<NewChangeset>> {
  console.debug(3, sinceRef);

  try {
    const changesetFolder = path.join(cwd, ".changeset");
    const filesInChangesetFolder = await fs.readdir(changesetFolder);
    const contents = await (sinceRef == null
      ? filesInChangesetFolder
      : filterChangesetsSinceRef(
          filesInChangesetFolder,
          changesetFolder,
          sinceRef
        ));

    const changesetContentPromises = contents
      .filter(
        (file) =>
          !file.startsWith(".") && file.endsWith(".md") && file !== "README.md"
      )
      .map(async (file) => {
        const fileContent = await fs.readFile(
          path.join(changesetFolder, file),
          "utf-8"
        );
        const parsedContent = parseChangesetFile(fileContent);

        return {
          ...parsedContent,
          id: file.replace(".md", ""),
        };
      });
    const changesetContents = await Promise.all(changesetContentPromises);

    return changesetContents;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("There is no .changeset directory in this project");
    }

    throw err;
  }
}

export default getChangesets;
