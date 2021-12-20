# Release Checklist

This is a list of the things that need to happen during a release.

## Build a Release

### Prepare the Changelog

1. Go through the PR history since the last release. You can use this to show all the PRs that are merged on or after
   YYY-MM-DD: `https://github.com/issues?q=repo%3Acloudflare%2Fworkers-types+merged%3A%3E%3DYYYY-MM-DD`
1. Add this release to `CHANGELOG.md`. Use the structure of previous entries.

### Start a release PR

1. Create a new branch "#.#.#" where "#.#.#" is this release's version (release) or "#.#.#-rc.#" (release candidate)
1. Update the version number in `package.json`.
1. Push up a commit with the `CHANGELOG.md` changes. The commit message can just be "#.#.#" (release) or "#.#.#-rc.#"
   (release candidate)
1. Request review from maintainers.

### Review

Most of your comments will be about the changelog. Once the PR is finalized and approved...

1. If you made changes, squash or fixup all changes into a single commit.
1. Run `git push` and wait for CI to pass.

### Tag and build release

1. Once ready to merge, tag the commit by running `git tag -a v#.#.# -m #.#.#`
1. Run `git push --tags`.
1. Wait for CI to pass.

### Edit the release

Draft a new release on the [releases page](https://github.com/cloudflare/workers-types/releases) and update release
notes.

### Publish to npm

Full releases are tagged `latest`. If for some reason you mix up the commands below, follow the troubleshooting guide.

1. `npm publish`.
1. Tweet.

## Troubleshooting a release

Mistakes happen. Most of these release steps are recoverable if you mess up. The goal is not to, but if you find
yourself cursing a fat fingered command, here are some troubleshooting tips. Please feel free to add to this guide.

### I pushed the wrong tag

Tags and releases can be removed in GitHub. First,
[remove the remote tag](https://stackoverflow.com/questions/5480258/how-to-delete-a-remote-tag):

```console
$ git push --delete origin tagname
```

This will turn the release into a `draft` and you can delete it from the edit page.

Make sure you also delete the local tag:

```console
$ git tag --delete vX.X.X
```
