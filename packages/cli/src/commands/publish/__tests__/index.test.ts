import fixtures from "fixturez";
import publishCommand from "../index";
import { defaultConfig } from "@motss-changesets/config";
import * as path from "path";
import * as pre from "@motss-changesets/pre";
import { Config } from "@motss-changesets/types";
import { silenceLogsInBlock } from "@motss-changesets/test-utils";

let changelogPath = path.resolve(__dirname, "../../changelog");
let modifiedDefaultConfig: Config = {
  ...defaultConfig,
  changelog: [changelogPath, null],
};

const f = fixtures(__dirname);

jest.mock("../npm-utils.ts");
jest.mock("../publishPackages.ts");
jest.mock("@motss-changesets/pre");

describe("Publish command", () => {
  silenceLogsInBlock();
  let cwd: string;

  beforeEach(async () => {
    cwd = await f.copy("simple-project");
  });
  describe("in pre state", () => {
    beforeEach(() => {
      // @ts-ignore
      pre.readPreState.mockImplementation(() => ({ mode: "pre" }));
    });
    it("should report error if the tag option is used in pre release", async () => {
      await expect(
        publishCommand(cwd, { tag: "experimental" }, modifiedDefaultConfig)
      ).rejects.toThrowError();
    });
  });
});
