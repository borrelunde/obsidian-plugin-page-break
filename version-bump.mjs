import { readFileSync, writeFileSync } from "fs";

// Prioritize command-line argument (from semantic-release) over npm environment variable.
const targetVersion = process.argv[2] || process.env.npm_package_version;

if (!targetVersion) {
	console.error("Error: No version provided.");
	console.error("Usage: node version-bump.mjs <version>");
	console.error("Or run via npm script where npm_package_version is set.");
	process.exit(1);
}

// Read minAppVersion from manifest.json and bump the version to the target version.
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// Update versions.json with the target version and minAppVersion from manifest.json,
// but only if the target version is not already in versions.json.
const versions = JSON.parse(readFileSync('versions.json', 'utf8'));
if (!Object.values(versions).includes(minAppVersion)) {
    versions[targetVersion] = minAppVersion;
    writeFileSync('versions.json', JSON.stringify(versions, null, '\t'));
}
