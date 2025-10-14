# Releasing

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for
automated [semantic versioning](https://semver.org/) and releases.

## How to Release

1. Go to the Actions tab on GitHub
2. Select the `Release` workflow
3. Click `Run workflow`
4. Click the green `Run workflow` button

The workflow analyses the commit history and creates a release automatically based on it. Commit messages must
follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

## During Release

The workflow:

1. Analyses commits to determine the version
2. Updates `package.json`, `manifest.json`, and `versions.json`
3. Generates `CHANGELOG.md`
4. Commits changes to master
5. Creates a Git tag
6. Publishes a GitHub release with `manifest.json`, `main.js`, and `styles.css`

No manual version changes are needed.
