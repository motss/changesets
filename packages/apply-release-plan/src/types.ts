import { NewChangeset } from "@motss-changesets/types";

export type RelevantChangesets = {
  major: NewChangeset[];
  minor: NewChangeset[];
  patch: NewChangeset[];
};
