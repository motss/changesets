import { PreState, NewChangeset } from "@motss-changesets/types";
import { readPreState } from "@motss-changesets/pre";
import readChangesets from "@motss-changesets/read";

export type ChangesetState = {
  preState: PreState | undefined;
  changesets: NewChangeset[];
};

export async function readChangesetState(
  cwd: string = process.cwd()
): Promise<ChangesetState> {
  let preState = await readPreState(cwd);
  let isInPreMode = preState !== undefined && preState.mode === "pre";

  let changesets = await readChangesets(cwd);

  if (isInPreMode && preState !== undefined) {
    let changesetsToFilter = new Set(preState.changesets);
    changesets = changesets.filter((x) => !changesetsToFilter.has(x.id));
  }

  return {
    preState: isInPreMode ? preState : undefined,
    changesets,
  };
}
