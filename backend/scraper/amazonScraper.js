const puppeteer = require("puppeteer");

const scrapeAmazon = async (productUrl) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(productUrl, { waitUntil: "load" });

    const data = await page.evaluate(() => {
        let title = document.querySelector("#productTitle")?.innerText.trim();
        let price = document.querySelector(".a-price-whole")?.innerText.replace(",", "");
        let imageUrl = document.querySelector("#imgTagWrapperId img")?.src;

        return { title, price: parseFloat(price), imageUrl };
    });

    await browser.close();
    return data;
};

module.exports = scrapeAmazon;
