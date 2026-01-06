const fs = require("fs");
const path = require("path");

const OUTPUT_DIR_CANDIDATES = [
  path.join(process.cwd(), "dist", "public"),
  path.join(process.cwd(), "dist"),
];

const BAD_PATTERNS = ["vercel.app", "logic-site-referral", "http://"];
const REQUIRED_DOMAIN = "ccm-logichm.com";

function findOutputDir() {
  for (const candidate of OUTPUT_DIR_CANDIDATES) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function collectFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
      continue;
    }
    if (/\.(html|xml|txt)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function scanFile(filePath) {
  const contents = fs.readFileSync(filePath, "utf8");
  const sanitized = contents.replace(
    /http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9/g,
    ""
  );
  const matches = [];
  for (const pattern of BAD_PATTERNS) {
    if (sanitized.includes(pattern)) {
      matches.push(pattern);
    }
  }
  return { contents, matches };
}

function main() {
  const outputDir = findOutputDir();
  if (!outputDir) {
    console.error("validate-domain: build output directory not found.");
    process.exit(1);
  }

  const files = collectFiles(outputDir);
  if (files.length === 0) {
    console.error(`validate-domain: no .html/.xml/.txt files found in ${outputDir}.`);
    process.exit(1);
  }

  let foundRequiredDomain = false;
  const failures = [];

  for (const filePath of files) {
    const { contents, matches } = scanFile(filePath);
    if (contents.includes(REQUIRED_DOMAIN)) {
      foundRequiredDomain = true;
    }
    if (matches.length > 0) {
      failures.push({ filePath, matches });
    }
  }

  if (!foundRequiredDomain) {
    console.error(
      `validate-domain: expected to find "${REQUIRED_DOMAIN}" in output, but none was found.`
    );
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error("validate-domain: forbidden domains/protocols found in output:");
    for (const failure of failures) {
      console.error(`- ${failure.filePath}: ${failure.matches.join(", ")}`);
    }
    process.exit(1);
  }

  console.log(`validate-domain: ok (${files.length} files scanned).`);
}

main();
