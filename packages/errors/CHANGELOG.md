# @changesets/errors

## [0.1.5](https://github.com/changesets/changesets/releases/tag/@motss-changesets/errors/v0.1.5)

### Patch Changes

- chore: rename scope and update release yaml
  ([`7c7b8db`](https://github.com/changesets/changesets/commit/7c7b8db69744cdb74689d46b00994f983a566d72)) ([@motss](https://github.com/motss))

## 0.1.4

### Patch Changes

- [`1706fb7`](https://github.com/changesets/changesets/commit/1706fb751ecc2f5a792c42f467b2063078d58716) [#321](https://github.com/changesets/changesets/pull/321) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Fix TypeScript declarations

## 0.1.3

### Patch Changes

- [`04ddfd7`](https://github.com/changesets/changesets/commit/04ddfd7c3acbfb84ef9c92873fe7f9dea1f5145c) [#305](https://github.com/changesets/changesets/pull/305) Thanks [@Noviny](https://github.com/Noviny)! - Add link to changelog in readme

## 0.1.2

### Patch Changes

- [`8f0a1ef`](https://github.com/changesets/changesets/commit/8f0a1ef327563512f471677ef0ca99d30da009c0) [#183](https://github.com/changesets/changesets/pull/183) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Add `InternalError` for errors which are unexpected and if they occur, an issue should be opened. The CLI catches the error and logs a link for users to open an issue with the error and versions of Node and Changesets filled in

- [`8f0a1ef`](https://github.com/changesets/changesets/commit/8f0a1ef327563512f471677ef0ca99d30da009c0) [#183](https://github.com/changesets/changesets/pull/183) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Add `PreExitButNotInPreModeError` and `PreEnterButInPreModeError`

## 0.1.1

### Patch Changes

- [`5ababa0`](https://github.com/changesets/changesets/commit/5ababa08c8ea5ee3b4ff92253e2e752a5976cd27) [#201](https://github.com/changesets/changesets/pull/201) Thanks [@ajaymathur](https://github.com/ajaymathur)! - - Added ExitError class and ValidationError class
  - Extend extendable-error in our error classes instead of JS Error class due to better Error messages thrown

## 0.1.0

### Minor Changes

- [`94de7c1`](https://github.com/changesets/changesets/commit/94de7c1df278d63f98b599c08271ba4ef26bc3f8) [#173](https://github.com/changesets/changesets/pull/173) Thanks [@ajaymathur](https://github.com/ajaymathur)! - Create package with `GitError`
