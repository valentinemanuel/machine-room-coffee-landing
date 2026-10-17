import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true, args: ["--no-first-run", "--disable-extensions", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
const { storyTop } = await page.evaluate(() => ({ storyTop: document.querySelector("#story").offsetTop }));
for (const [i, frac] of [[1, 0.35], [2, 1.35], [3, 2.35], [4, 3.35]].entries()) {}
for (const [i, frac] of [[0, 0.35], [1, 1.35], [2, 2.35], [3, 3.35]]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), storyTop + frac * 900);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `qa-shots/story-scene-${i + 1}.png` });
}
await browser.close();
console.log("story shots saved");
