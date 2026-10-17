// Reproduce the hydration crash from the deployed landing page and print
// the full, unminified error stack using headless Edge.
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--no-first-run", "--disable-extensions"],
});

const page = await browser.newPage();
page.on("pageerror", (error) => {
  console.log("PAGE ERROR:", error.message);
  console.log(error.stack?.slice(0, 4000));
});
page.on("console", (message) => {
  if (message.type() === "error") console.log("CONSOLE:", message.text().slice(0, 1500));
});

await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((resolve) => setTimeout(resolve, 4000));

const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 200));
console.log("BODY TEXT:", JSON.stringify(bodyText));

await browser.close();
