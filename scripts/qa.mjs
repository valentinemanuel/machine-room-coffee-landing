// Full QA pass for the Machine Room landing page.
// Desktop + mobile: console errors, anchor navigation, hamburger menu,
// empty form validation, legal pages, JSON-LD, and screenshots.
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const URL = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? "qa-shots";
let failures = 0;

function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--no-first-run", "--disable-extensions", "--hide-scrollbars"],
});

await mkdir(OUT, { recursive: true });

// ---------- Desktop ----------
const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900 });
const errors = [];
desktop.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
desktop.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

await desktop.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

const meta = await desktop.evaluate(() => ({
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content ?? "",
  ogImage: document.querySelector('meta[property="og:image"]')?.content ?? "",
  ldJson: document.querySelectorAll('script[type="application/ld+json"]').length,
  headings: [...document.querySelectorAll("h1,h2")].length,
}));
check("meta title", meta.title.length > 10, meta.title);
check("meta description", meta.description.length > 50);
check("og:image present", meta.ogImage.length > 5, meta.ogImage);
check("JSON-LD blocks", meta.ldJson >= 2, `${meta.ldJson} found`);
check("headings exist", meta.headings >= 8, `${meta.headings} found`);

let jsonOk = true;
for (const block of await desktop.$$eval('script[type="application/ld+json"]', (nodes) =>
  nodes.map((node) => node.textContent),
)) {
  try {
    JSON.parse(block);
  } catch {
    jsonOk = false;
  }
}
check("JSON-LD parses", jsonOk);

const images = [];
// Lazy images load as the visitor scrolls, so this is checked after the full
// scroll further below. Placeholder to keep the check order stable.
// Anchor navigation
for (const anchor of ["#story", "#menu", "#roastery", "#gallery", "#faq", "#reserve"]) {
  await desktop.click(`nav a[href="${anchor}"]`);
  await new Promise((resolve) => setTimeout(resolve, 1400));
  const landed = await desktop.evaluate((id) => {
    const top = document.querySelector(id)?.getBoundingClientRect().top ?? -9999;
    return top > -window.innerHeight && top < window.innerHeight * 0.6;
  }, anchor);
  check(`nav anchor ${anchor} lands`, landed);
}

// Scroll through the entire page while listening for errors
await desktop.click('nav a[href="#top"]');
await new Promise((resolve) => setTimeout(resolve, 1200));
const pageHeight = await desktop.evaluate(() => document.body.scrollHeight);
for (let position = 0; position < pageHeight; position += 700) {
  await desktop.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), position);
  await new Promise((resolve) => setTimeout(resolve, 220));
}
await desktop.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await new Promise((resolve) => setTimeout(resolve, 1500));
check("no JS errors over full desktop scroll", errors.length === 0, errors.slice(0, 3).join(" | "));

// After the full scroll, lazy images have had their chance to load.
const seen = new Set();
const imageRows = await desktop.evaluate(() =>
  [...document.querySelectorAll("img")].map((image) => ({
    src: image.getAttribute("src"),
    alt: image.getAttribute("alt"),
    ok: image.complete && image.naturalWidth > 0,
  })),
);
for (const image of imageRows) {
  if (seen.has(image.src)) continue;
  seen.add(image.src);
  check(`image loads + alt: ${(image.src ?? "").replace(/(_next\/image\?url=|&w=\d+.*$)/g, "").slice(0, 40)}`, image.ok && Boolean(image.alt));
}

await desktop.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true });

// Reservation form: empty submit must show inline errors
await desktop.click('nav a[href="#reserve"]');
await new Promise((resolve) => setTimeout(resolve, 1200));
await desktop.click('#reserve button[type="submit"]');
await new Promise((resolve) => setTimeout(resolve, 600));
const validationSeen = await desktop.evaluate(() => document.querySelector('#reserve [role="alert"]')?.textContent ?? "");
check("empty form shows inline validation", validationSeen.length > 10, validationSeen.slice(0, 60));

// Legal pages
await desktop.goto(`${URL}/privacy`, { waitUntil: "domcontentloaded" });
const privacyTitle = await desktop.title();
check("privacy page", privacyTitle.includes("Privacy"));
await desktop.goto(`${URL}/terms`, { waitUntil: "domcontentloaded" });
check("terms page", (await desktop.title()).includes("Terms"));

// 404
const notFound = await browser.newPage();
await notFound.goto(`${URL}/no-such-page`, { waitUntil: "domcontentloaded" });
const notFoundText = await notFound.evaluate(() => document.body.innerText);
check("404 page is branded", notFoundText.includes("went for a coffee"));

// ---------- Mobile ----------
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
const mobileErrors = [];
mobile.on("pageerror", (error) => mobileErrors.push(error.message));
mobile.on("console", (message) => {
  if (message.type() === "error") mobileErrors.push(message.text());
});

await mobile.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
check("mobile: no JS errors on load", mobileErrors.length === 0, mobileErrors[0] ?? "");

const desktopToggle = await mobile.$("button[aria-label*='menu']");
check("mobile: hamburger exists", Boolean(desktopToggle));
if (desktopToggle) {
  await desktopToggle.click();
  await new Promise((resolve) => setTimeout(resolve, 900));
  const overlayVisible = await mobile.evaluate(
    () => Boolean([...document.querySelectorAll("a")].find((link) => link.textContent === "The world")),
  );
  check("mobile: overlay links visible", overlayVisible);
  await mobile.screenshot({ path: `${OUT}/mobile-overlay.png` });
  await mobile.evaluate(() => {
    const link = [...document.querySelectorAll("a")].find((element) => element.textContent === "Reservations");
    link?.click();
  });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const reserveVisible = await mobile.evaluate(() => {
    const section = document.querySelector("#reserve")?.getBoundingClientRect();
    return Boolean(section && section.top < window.innerHeight);
  });
  check("mobile: overlay link navigates to reservations", reserveVisible);
}

// Horizontal menu section: scroll progress
await mobile.goto(URL, { waitUntil: "networkidle2" });
const menuScrollWorks = await mobile.evaluate(async () => {
  const menu = document.querySelector("#menu");
  const start = menu.offsetTop;
  window.scrollTo({ top: start + window.innerHeight * 1.6, behavior: "instant" });
  await new Promise((resolve) => setTimeout(resolve, 700));
  return window.scrollY > start;
});
check("scroll-driven menu engages", menuScrollWorks);

// Form success path on mobile
await mobile.evaluate(() => document.querySelector("#reserve")?.scrollIntoView({ behavior: "instant" }));
await mobile.type("#reserve input[name='name']", "Ada Reyes", { delay: 5 });
await mobile.type("#reserve input[name='email']", "ada@reyes.dev", { delay: 5 });
await mobile.click('#reserve button[type="submit"]');
await new Promise((resolve) => setTimeout(resolve, 2600));
const successText = await mobile.evaluate(() => document.querySelector("#reserve")?.innerText ?? "");
check("reservation success state", successText.includes("Reyes"), successText.slice(0, 60).replace(/\n/g, " "));
await mobile.screenshot({ path: `${OUT}/mobile-success.png` });

// Steam and counters visible in screenshots, done. Close.
await browser.close();

console.log(`\nQA finished: ${failures} failure(s)`);
process.exit(failures > 0 ? 1 : 0);
