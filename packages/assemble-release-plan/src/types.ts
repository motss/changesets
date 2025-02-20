import { VersionType, PreState } from "@motss-changesets/types";

export type InternalRelease = {
  name: string;
  type: VersionType;
  oldVersion: string;
  changesets: string[];
};

export type PreInfo = {
  state: PreState;
  preVersions: Map<string, number>;
};
