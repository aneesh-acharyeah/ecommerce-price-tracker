const express = require("express");
const Product = require("../models/Product");
const scrapeAmazon = require("../scraper/amazonScraper");

const router = express.Router();

// Scrape and Save Product
router.post("/track", async (req, res) => {
    try {
        const { url } = req.body;
        const scrapedData = await scrapeAmazon(url);

        let product = await Product.findOne({ url });

        if (product) {
            product.priceHistory.push(scrapedData.price);
            product.currentPrice = scrapedData.price;
            product.lastUpdated = new Date();
            await product.save();
        } else {
            product = await Product.create({
                title: scrapedData.title,
                url,
                currentPrice: scrapedData.price,
                priceHistory: [scrapedData.price],
                imageUrl: scrapedData.imageUrl,
            });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error tracking product" });
    }
});

module.exports = router;
