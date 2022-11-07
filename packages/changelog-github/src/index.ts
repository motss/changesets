import { ChangelogFunctions } from "@changesets/types";
// @ts-ignore
import { config } from "dotenv";
import { getInfo, getInfoFromPullRequest } from "@changesets/get-github-info";

function ensureRepoValid(options) {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@motss-changesets/changelog-github", { "repo": "org/repo" }]'
    );
  }
}

config();

const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine: async (
    changesets,
    dependenciesUpdated,
    options
  ) => {
    ensureRepoValid(options);

    if (dependenciesUpdated.length === 0) return "";

    const changesetLink = `- Updated dependencies [${(
      await Promise.all(
        changesets.map(async (cs) => {
          if (cs.commit) {
            let { links } = await getInfo({
              repo: options.repo,
              commit: cs.commit,
            });
            return links.commit;
          }
        })
      )
    )
      .filter((_) => _)
      .join(", ")}]:`;

    const updatedDependenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
    );

    return [changesetLink, ...updatedDependenciesList].join("\n");
  },
  getReleaseLine: async (changeset, _releaseType, options) => {
    ensureRepoValid(options);

    let prFromSummary: number | undefined;
    let commitFromSummary: string | undefined;
    let usersFromSummary: string[] = [];

    console.log(
      "getReleaseLine",
      JSON.stringify(
        {
          summary: changeset.summary,
        },
        null,
        2
      )
    );

    const replacedChangelog = changeset.summary
      .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
        let num = Number(pr);
        if (!isNaN(num)) prFromSummary = num;
        return "";
      })
      .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
        commitFromSummary = commit;
        return "";
      })
      .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
        usersFromSummary.push(user);
        return "";
      })
      .trim();

    const [firstLine, ...futureLines] = replacedChangelog
      .split("\n")
      .map((l) => l.trimRight());

    const links = await (async () => {
      if (prFromSummary !== undefined) {
        let { links } = await getInfoFromPullRequest({
          repo: options.repo,
          pull: prFromSummary,
        });
        if (commitFromSummary) {
          links = {
            ...links,
            commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
          };
        }
        return links;
      }
      const commitToFetchFrom = commitFromSummary || changeset.commit;
      if (commitToFetchFrom) {
        let { links } = await getInfo({
          repo: options.repo,
          commit: commitToFetchFrom,
        });
        return links;
      }
      return {
        commit: null,
        pull: null,
        user: null,
      };
    })();

    console.debug(
      "getReleaseLine",
      JSON.stringify(
        {
          changeset,
          links,
          prFromSummary,
        },
        null,
        2
      )
    );

    const users = usersFromSummary.length
      ? usersFromSummary
          .map(
            (userFromSummary) =>
              `[@${userFromSummary}](https://github.com/${userFromSummary})`
          )
          .join(", ")
      : links.user;

    const linksTemplate =
      options.linksTemplate || "* {pull+}{commit+}{users+}{lines}";
    const formattedFutureLines = futureLines.map((l) => `  ${l}`).join("\n");
    const formattedLines = `${firstLine}\n${formattedFutureLines}`;

    // TODO: Support new line with ! symbol.
    const a = [
      "\n\n",
      linksTemplate
        .replace("{pull}", links.pull || "")
        .replace("{pull+}", links.pull ? `${links.pull} ` : "")
        .replace("{+pull}", links.pull ? ` ${links.pull}` : "")
        .replace("{commit}", links.commit || "")
        .replace("{commit+}", links.commit ? `${links.commit} ` : "")
        .replace("{+commit}", links.commit ? ` ${links.commit}` : "")
        .replace("{users}", users ? `(${users})` : "")
        .replace("{users+}", users ? `(${users}) ` : "")
        .replace("{+users}", users ? ` (${users})` : "")
        .replace("{lines}", formattedLines || "")
        .replace("{lines+}", formattedLines ? `${formattedLines} ` : "")
        .replace("{+lines}", formattedLines ? ` ${formattedLines}` : ""),
      // `*${futureLinesAsPrefix} ${firstLine}\n${futureLinesAsSuffix}`,
    ].join("");

    // const prefix = [
    //   links.pull === null ? "" : ` ${links.pull}`,
    //   links.commit === null ? "" : ` ${links.commit}`,
    //   users === null ? "" : ` Thanks ${users}!`,
    // ].join("");

    // return `\n\n-${prefix ? `${prefix} -` : ""} ${firstLine}\n${futureLines
    //   .map((l) => `  ${l}`)
    //   .join("\n")}`;
    return a;
  },
};

export default changelogFunctions;
