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
const ROUTE_META: Record<string, { title: string; description: string }> = {
  "partner-program": {
    title: "LOGIC Health | Referral Partner Program",
    description: "Introduce providers to an end-to-end care management operator. LOGIC runs implementation and operations; you earn recurring commission.",
  },
  "opportunity": {
    title: "LOGIC Health | Opportunity",
    description: "A simple way to monetize provider relationships with recurring commissions and a low-lift handoff to LOGIC.",
  },
  "who-its-for": {
    title: "LOGIC Health | Who It's For",
    description: "Best fit: reps with existing clinic relationships who want to add a high-value care-management solution to their sales motion.",
  },
  "how-it-works": {
    title: "LOGIC Health | How It Works",
    description: "You open the door; LOGIC leads discovery through contracting, activation, and ongoing care-management operations.",
  },
  "comp": {
    title: "LOGIC Health | Compensation",
    description: "Transparent recurring commissions tied to activated provider accounts.",
  },
  "faq": {
    title: "LOGIC Health | FAQ",
    description: "Common questions about the LOGIC partner program, process, and expectations.",
  },
  "compensation": {
    title: "LOGIC Health | Compensation",
    description: "Transparent recurring commissions tied to activated provider accounts.",
  },
};

function generateRouteHtml(baseHtml: string, route: string, meta: { title: string; description: string }): string {
  const canonicalUrl = `${BASE_URL}/${route}`;
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
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
  } else {
    html = html.replace(/<\/head>/, `    <meta property="og:url" content="${canonicalUrl}" />\n  </head>`);
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
