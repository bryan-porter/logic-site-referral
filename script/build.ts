import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

// Route metadata for static HTML generation
const BASE_URL = "https://logic-site-referral.vercel.app";
const CANONICAL_OVERRIDES: Record<string, string> = {
  "partner-program": "",
  "compensation": "comp",
};
const ROUTE_META: Record<string, { title: string; description: string }> = {
  "partner-program": {
    title: "LOGIC Health | Referral Partner Program",
    description: "Introduce providers to LOGIC—an outsourced care-management operator. LOGIC runs implementation and ongoing operations; you earn recurring commission.",
  },
  "opportunity": {
    title: "LOGIC Health | Opportunity",
    description: "Monetize provider relationships with recurring commissions and a simple handoff. LOGIC runs the care-management program end-to-end—no headcount added.",
  },
  "who-its-for": {
    title: "LOGIC Health | Who It's For",
    description: "Best fit for reps with provider relationships who want a high-value care-management offering. LOGIC leads the sales process and runs operations after launch.",
  },
  "how-it-works": {
    title: "LOGIC Health | How It Works",
    description: "You open the door; LOGIC runs discovery, contracting, activation, and ongoing care-management operations. Clear process, minimal partner lift, monthly reporting.",
  },
  "comp": {
    title: "LOGIC Health | Compensation",
    description: "Transparent recurring commissions tied to activated provider accounts. Upside scales with successful implementations and ongoing program performance.",
  },
  "faq": {
    title: "LOGIC Health | FAQ",
    description: "Answers to common questions about the LOGIC referral partner program, process, expectations, and how LOGIC supports providers after launch.",
  },
  "compensation": {
    title: "LOGIC Health | Compensation",
    description: "Transparent recurring commissions tied to activated provider accounts. Upside scales with successful implementations and ongoing program performance.",
  },
};

function generateRouteHtml(baseHtml: string, route: string, meta: { title: string; description: string }): string {
  const routeUrl = `${BASE_URL}/${route}`;
  const canonicalPath = CANONICAL_OVERRIDES[route] ?? route;
  const canonicalUrl = canonicalPath ? `${BASE_URL}/${canonicalPath}` : `${BASE_URL}/`;
  let html = baseHtml;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace or add canonical
  if (/<link\s+rel="canonical"/.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    html = html.replace(/<\/head>/, `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  // Replace or add og:url
  if (/<meta\s+property="og:url"/.test(html)) {
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${routeUrl}" />`
    );
  } else {
    html = html.replace(/<\/head>/, `    <meta property="og:url" content="${routeUrl}" />\n  </head>`);
  }

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${meta.title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${meta.description}" />`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${meta.title}" />`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  return html;
}

async function generateStaticRoutePages() {
  const baseHtmlPath = path.join("dist", "public", "index.html");
  const baseHtml = await readFile(baseHtmlPath, "utf-8");

  for (const [route, meta] of Object.entries(ROUTE_META)) {
    const routeDir = path.join("dist", "public", route);
    const routeHtmlPath = path.join(routeDir, "index.html");

    await mkdir(routeDir, { recursive: true });
    const html = generateRouteHtml(baseHtml, route, meta);
    await writeFile(routeHtmlPath, html, "utf-8");
    console.log(`  generated ${route}/index.html`);
  }
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("generating static route pages...");
  await generateStaticRoutePages();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
