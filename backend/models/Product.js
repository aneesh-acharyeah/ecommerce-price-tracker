const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    url: String,
    currentPrice: Number,
    priceHistory: [Number],
    imageUrl: String,
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
