import { readFile } from "fs/promises";

const JSONLD_PATTERN = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;

async function validateJsonLd() {
  const html = await readFile("client/index.html", "utf-8");
  const match = html.match(JSONLD_PATTERN);

  if (!match) {
    throw new Error("JSON-LD script tag not found in client/index.html.");
  }

  JSON.parse(match[1]);
  console.log("JSON-LD parsed successfully.");
}

validateJsonLd().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
