import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const manifestPath = join(root, "catalog", "endpoints.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.endpoints)) {
  throw new Error("catalog/endpoints.json has an unsupported shape.");
}

const ids = new Set();
const paths = new Set();
const repositories = new Set();
for (const endpoint of manifest.endpoints) {
  for (const field of ["id", "name", "method", "path", "landingPage", "repository", "status"]) {
    if (!endpoint[field]) throw new Error(`${endpoint.id || "endpoint"} is missing ${field}.`);
  }
  if (ids.has(endpoint.id)) throw new Error(`Duplicate endpoint id: ${endpoint.id}`);
  if (paths.has(endpoint.path)) throw new Error(`Duplicate endpoint path: ${endpoint.path}`);
  if (repositories.has(endpoint.repository)) {
    throw new Error(`Duplicate focused repository: ${endpoint.repository}`);
  }
  if (endpoint.method !== "POST") throw new Error(`${endpoint.id} must use POST.`);
  if (endpoint.status !== "published") throw new Error(`${endpoint.id} is not published.`);
  if (endpoint.contractSource && endpoint.contractSource !== "api-catalog") {
    throw new Error(`${endpoint.id} has an unsupported contract source.`);
  }
  if (!endpoint.path.startsWith("/v1/")) throw new Error(`${endpoint.id} has an invalid path.`);
  ids.add(endpoint.id);
  paths.add(endpoint.path);
  repositories.add(endpoint.repository);
}

if (manifest.endpoints.length !== 46) {
  throw new Error(`Expected 46 public submit endpoints, found ${manifest.endpoints.length}.`);
}

const openApiPath = process.env.SOCQ_OPENAPI_PATH;
if (openApiPath) {
  const openApi = JSON.parse(readFileSync(resolve(openApiPath), "utf8"));
  const submitPaths = Object.entries(openApi.paths || {})
    .filter(([path, operations]) => path.startsWith("/v1/") && operations?.post)
    .map(([path]) => path)
    .sort();
  const manifestPaths = manifest.endpoints
    .filter((endpoint) => endpoint.contractSource !== "api-catalog")
    .map((endpoint) => endpoint.path)
    .sort();

  const missingManifestPaths = manifestPaths.filter((path) => !submitPaths.includes(path));
  if (missingManifestPaths.length) {
    throw new Error(
      `Endpoint manifest paths missing from the supplied OpenAPI: ${missingManifestPaths.join(", ")}.`,
    );
  }
}

const requiredFiles = [
  "node/instagram-search/index.mjs",
  "node/youtube-transcript/index.mjs",
  "python/instagram-search/main.py",
  "python/youtube-transcript/main.py",
  "shared/node/socq-client.mjs",
  "shared/python/socq_client.py",
  "fixtures/submit-response.json",
  "fixtures/task-response.json",
];

for (const path of requiredFiles) {
  statSync(join(root, path));
}

const nodeFiles = requiredFiles.filter((path) => path.endsWith(".mjs"));
for (const path of nodeFiles) {
  const result = spawnSync(process.execPath, ["--check", join(root, path)], { stdio: "inherit" });
  if (result.status !== 0) throw new Error(`Node syntax check failed: ${path}`);
}

const pythonFiles = requiredFiles.filter((path) => path.endsWith(".py"));
for (const path of pythonFiles) {
  const source = readFileSync(join(root, path), "utf8");
  const result = spawnSync(
    "python3",
    ["-c", "import ast,sys; ast.parse(sys.stdin.read())"],
    { input: source, encoding: "utf8", stdio: ["pipe", "inherit", "inherit"] },
  );
  if (result.status !== 0) throw new Error(`Python syntax check failed: ${path}`);
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (name === ".git" || name === "node_modules") return [];
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const bearerPattern =
  /Authorization:\s*Bearer\s+(?!\$SOCQ_API_KEY|<SOCQ_API_KEY>)[A-Za-z0-9_-]{20,}/;
const apiKeyAssignmentPattern = /SOCQ_API_KEY\s*=\s*["']?([^"'\s]+)/;
const safeApiKeyValues = new Set(["your-api-key", "$SOCQ_API_KEY", "<SOCQ_API_KEY>"]);

for (const path of walk(root)) {
  const relativePath = relative(root, path);
  if (/\.(png|jpe?g|webp)$/i.test(path)) continue;
  const contents = readFileSync(path, "utf8");
  if (bearerPattern.test(contents)) {
    throw new Error(`Possible bearer credential in ${relativePath}.`);
  }
  const assignment = contents.match(apiKeyAssignmentPattern);
  if (assignment && !safeApiKeyValues.has(assignment[1])) {
    throw new Error(`Possible API key assignment in ${relativePath}.`);
  }
}

const openApiCount = manifest.endpoints.filter(
  (endpoint) => endpoint.contractSource !== "api-catalog",
).length;
const catalogCount = manifest.endpoints.length - openApiCount;

console.log(
  `Validated ${manifest.endpoints.length} endpoints (${openApiCount} OpenAPI and ` +
    `${catalogCount} API catalog) and ${requiredFiles.length} example files.`,
);
