# Release Checklist

This is a list of the things that need to happen during a release.

## Steps

1. Go to the [Releases](https://github.com/cloudflare/workers-types/releases) tab.
2. Click on the ["Draft a new release"](https://github.com/Electroid/bytebuf/releases/new) button. If you do not see it, you may not have permissions to create a release on the repository.
3. Choose or create a new tag for the release. It should follow the [semver](https://semver.org) format: `v#.#.#` (e.g. `v3.2.1`). Also use this value to fill-in the "Release title," excluding the "v" (e.g. `3.2.1`).
4. Click on the "Auto-generate release notes" button. If you need to make tweaks, feel free to do so.
5. Click on the "Publish release" button. This will trigger a GitHub action to release the package to NPM.
