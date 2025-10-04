import {readFileSync} from 'node:fs';

// A script that verifies that the version in package.json and manifest.json are the same.
// It is intended to be used in CI/CD workflows.

function readJson(path) {
	return JSON.parse(readFileSync(path, 'utf8'));
}

function fail(msg) {
	console.error(msg);
	process.exit(1);
}

try {
	const packageJson = readJson('./package.json');
	const manifestJson = readJson('./manifest.json');

	const packageVersion = packageJson.version;
	if (!packageVersion) {
		fail('package.json is missing version');
	}

	const manifestVersion = manifestJson.version;
	if (!manifestVersion) {
		fail('manifest.json is missing version');
	}

	if (packageVersion !== manifestVersion) {
		fail(`Version mismatch between package.json=${packageVersion} and manifest.json=${manifestVersion}`);
	}

	console.log(`The version in manifest and package.json match: (${packageVersion})`);
} catch (e) {
	fail(`An error occurred while verifying versions: ${e.message}`);
}
