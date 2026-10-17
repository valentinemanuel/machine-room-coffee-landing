import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true, args: ["--no-first-run", "--disable-extensions", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
await page.click("button[aria-label='Open menu']");
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: "qa-shots/mobile-overlay-fixed.png" });
await browser.close();
console.log("shot saved");
