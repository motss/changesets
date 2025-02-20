# @changesets/get-dependents-graph

## [1.3.8](https://github.com/changesets/changesets/releases/tag/@motss-changesets/get-dependents-graph@1.3.8)

### Patch Changes

- fix: release url fix
  ([`d2c5de8`](https://github.com/changesets/changesets/commit/d2c5de8db955350e898939b3af782d8680c78b1f)) ([@motss](https://github.com/motss))

* Updated dependencies [[`d2c5de8`](https://github.com/changesets/changesets/commit/d2c5de8db955350e898939b3af782d8680c78b1f)]:
  - @motss-changesets/types@5.2.4

## [1.3.7](https://github.com/changesets/changesets/releases/tag/@motss-changesets/get-dependents-graph/v1.3.7)

### Patch Changes

- chore: remove unused package, bump-all
  ([`e208e88`](https://github.com/changesets/changesets/commit/e208e88c7ed4ffafad4f545385ec5393bf154de6)) ([@motss](https://github.com/motss))

* Updated dependencies [[`e208e88`](https://github.com/changesets/changesets/commit/e208e88c7ed4ffafad4f545385ec5393bf154de6)]:
  - @motss-changesets/types@5.2.3

## [1.3.6](https://github.com/changesets/changesets/releases/tag/@motss-changesets/get-dependents-graph/v1.3.6)

### Patch Changes

- chore: bump all packages
  ([`691e8da`](https://github.com/changesets/changesets/commit/691e8dab60c1c56cc79cf5857259edeb4352f43a)) ([@motss](https://github.com/motss))

* Updated dependencies [[`691e8da`](https://github.com/changesets/changesets/commit/691e8dab60c1c56cc79cf5857259edeb4352f43a)]:
  - @motss-changesets/types@5.2.2

## [1.3.5](https://github.com/changesets/changesets/releases/tag/@motss-changesets/get-dependents-graph/v1.3.5)

### Patch Changes

- chore: rename all scope in dependencies
  ([`c1a4420`](https://github.com/changesets/changesets/commit/c1a442099d818aa3f35e7a287c28b3e399994a83)) ([@motss](https://github.com/motss))

- chore: rename scope and update release yaml
  ([`7c7b8db`](https://github.com/changesets/changesets/commit/7c7b8db69744cdb74689d46b00994f983a566d72)) ([@motss](https://github.com/motss))

* Updated dependencies [[`7c7b8db`](https://github.com/changesets/changesets/commit/7c7b8db69744cdb74689d46b00994f983a566d72)]:
  - @motss-changesets/types@5.2.1

## 1.3.4

### Patch Changes

- Updated dependencies [[`8c08469`](https://github.com/changesets/changesets/commit/8c0846977597ddaf51aaeb35f1f0f9428bf8ba14)]:
  - @changesets/types@5.2.0

## 1.3.3

### Patch Changes

- Updated dependencies [[`dd9b76f`](https://github.com/changesets/changesets/commit/dd9b76f162a546ae8b412e0cb10277f971f3585e)]:
  - @changesets/types@5.1.0

## 1.3.2

### Patch Changes

- Updated dependencies [[`c87eba6`](https://github.com/changesets/changesets/commit/c87eba6f80a34563b7382f87472c29f6dafb546c)]:
  - @changesets/types@5.0.0

## 1.3.1

### Patch Changes

- Updated dependencies [[`27a5a82`](https://github.com/changesets/changesets/commit/27a5a82188914570d192162f9d045dfd082a3c15)]:
  - @changesets/types@4.1.0

## 1.3.0

### Minor Changes

- [#704](https://github.com/changesets/changesets/pull/704) [`6f9c9d6`](https://github.com/changesets/changesets/commit/6f9c9d60c0e02c79d555c48deb01559057f1d252) Thanks [@Andarist](https://github.com/Andarist)! - Dependencies specified using a tag will no longer mark the graph as invalid. With such dependencies the user's intent is to fetch those from the registry even if otherwise they could be linked locally.

## 1.2.4

### Patch Changes

- [#667](https://github.com/changesets/changesets/pull/667) [`fe8db75`](https://github.com/changesets/changesets/commit/fe8db7500f81caea9064f8bec02bcb77e0fd8fce) Thanks [@fz6m](https://github.com/fz6m)! - Upgraded `@manypkg/get-packages` dependency to fix getting correct packages in pnpm workspaces with exclude rules.

- Updated dependencies [[`9a993ba`](https://github.com/changesets/changesets/commit/9a993ba09629c1620d749432520470cec49d3a96)]:
  - @changesets/types@4.0.2

## 1.2.3

### Patch Changes

- [#585](https://github.com/changesets/changesets/pull/585) [`74dda8c`](https://github.com/changesets/changesets/commit/74dda8c0d8bd1741ca7b19f0ccb37b2330dc9549) Thanks [@javier-garcia-meteologica](https://github.com/javier-garcia-meteologica)! - Add support for `workspace:^` and `workspace:~` dependency ranges.

## 1.2.2

### Patch Changes

- Updated dependencies [[`e89e28a`](https://github.com/changesets/changesets/commit/e89e28a05f5fa43307db73812a6bcd269b62ddee)]:
  - @changesets/types@4.0.1

## 1.2.1

### Patch Changes

- Updated dependencies [[`de2b4a5`](https://github.com/changesets/changesets/commit/de2b4a5a7b244a37d94625bcb70ecde9dde5b612)]:
  - @changesets/types@4.0.0

## 1.2.0

### Minor Changes

- [`12f9a43`](https://github.com/changesets/changesets/commit/12f9a433a6c3ac38f9405fcd77c9108c423d7101) [#507](https://github.com/changesets/changesets/pull/507) Thanks [@zkochan](https://github.com/zkochan)! - New setting added: bumpVersionsWithWorkspaceProtocolOnly. When it is set to `true`, versions are bumped in `dependencies`, only if those versions are prefixed by the workspace protocol. For instance, `"foo": "workspace:^1.0.0"`.

### Patch Changes

- Updated dependencies [[`12f9a43`](https://github.com/changesets/changesets/commit/12f9a433a6c3ac38f9405fcd77c9108c423d7101)]:
  - @changesets/types@3.3.0

## 1.1.3

### Patch Changes

- Updated dependencies [[`2b49d66`](https://github.com/changesets/changesets/commit/2b49d668ecaa1333bc5c7c5be4648dda1b11528d)]:
  - @changesets/types@3.0.0

## 1.1.2

### Patch Changes

- [`d678da5`](https://github.com/changesets/changesets/commit/d678da5e9936862bb66e5edb538c5b8be23d4ffe) [#324](https://github.com/changesets/changesets/pull/324) Thanks [@zkochan](https://github.com/zkochan)! - Dev dependencies that are installed via the link or file protocol are ignored.

## 1.1.1

### Patch Changes

- [`1706fb7`](https://github.com/changesets/changesets/commit/1706fb751ecc2f5a792c42f467b2063078d58716) [#321](https://github.com/changesets/changesets/pull/321) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Fix TypeScript declarations

- Updated dependencies [[`1706fb7`](https://github.com/changesets/changesets/commit/1706fb751ecc2f5a792c42f467b2063078d58716)]:
  - @changesets/types@2.0.1

## 1.1.0

### Minor Changes

- [`c3cc232`](https://github.com/changesets/changesets/commit/c3cc23204c6cb80487aced1b37ebe8ffde0e2111) [#311](https://github.com/changesets/changesets/pull/311) Thanks [@zkochan](https://github.com/zkochan)! - Added support for workspace ranges. Package graph validation understands them now and allows them to satisfy dependents' required ranges.

### Patch Changes

- Updated dependencies [[`011d57f`](https://github.com/changesets/changesets/commit/011d57f1edf9e37f75a8bef4f918e72166af096e)]:
  - @changesets/types@2.0.0

## 1.0.1

### Patch Changes

- [`04ddfd7`](https://github.com/changesets/changesets/commit/04ddfd7c3acbfb84ef9c92873fe7f9dea1f5145c) [#305](https://github.com/changesets/changesets/pull/305) Thanks [@Noviny](https://github.com/Noviny)! - Add link to changelog in readme

- [`b49e1cf`](https://github.com/changesets/changesets/commit/b49e1cff65dca7fe9e341a35aa91704aa0e51cb3) [#306](https://github.com/changesets/changesets/pull/306) Thanks [@Andarist](https://github.com/Andarist)! - Ignore `node_modules` when glob searching for packages. This fixes an issue with package cycles.

- Updated dependencies [[`04ddfd7`](https://github.com/changesets/changesets/commit/04ddfd7c3acbfb84ef9c92873fe7f9dea1f5145c), [`e56928b`](https://github.com/changesets/changesets/commit/e56928bbd6f9096def06ac37487bdbf28efec9d1)]:
  - @changesets/types@1.0.1

## 1.0.0

### Major Changes

- [`cc8c921`](https://github.com/changesets/changesets/commit/cc8c92143d4c4b7cca8b9917dfc830a40b5cda20) [#290](https://github.com/changesets/changesets/pull/290) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Initial release of `@changesets/get-dependents-graph`. If you're migrating from `get-dependents-graph`, you will need to pass the `Packages` object(which is returned from `@manypkg/get-packages`) to `getDependentsGraph` and also import `getDependentsGraph` as a named export instead of a default export.

### Patch Changes

- Updated dependencies [[`41e2e3d`](https://github.com/changesets/changesets/commit/41e2e3dd1053ff2f35a1a07e60793c9099f26997), [`cc8c921`](https://github.com/changesets/changesets/commit/cc8c92143d4c4b7cca8b9917dfc830a40b5cda20), [`cc8c921`](https://github.com/changesets/changesets/commit/cc8c92143d4c4b7cca8b9917dfc830a40b5cda20), [`2363366`](https://github.com/changesets/changesets/commit/2363366756d1b15bddf6d803911baccfca03cbdf)]:
  - @changesets/types@1.0.0
