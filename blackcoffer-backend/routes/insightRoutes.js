import express from "express";
import Insight from "../models/Insight.js";

const router = express.Router();

// GET /api/insights/filters
// Fetch unique values for filters
router.get("/filters", async (req, res) => {
    console.log("GET /filters hit");
    try {
        const filters = {
            end_year: await Insight.distinct("end_year"),
            topic: await Insight.distinct("topic"),
            sector: await Insight.distinct("sector"),
            region: await Insight.distinct("region"),
            pestle: await Insight.distinct("pestle"),
            source: await Insight.distinct("source"),
            swot: await Insight.distinct("swot"),
            country: await Insight.distinct("country"),
            city: await Insight.distinct("city"),
        };

        // Sort and filter out empty strings
        Object.keys(filters).forEach(key => {
            filters[key] = filters[key].filter(val => val !== "").sort();
        });

        res.json(filters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET /api/insights
// Fetch all insights with optional filters
router.get("/", async (req, res) => {
    try {
        const {
            end_year,
            topic,
            sector,
            region,
            pestle,
            source,
            swot,
            country,
            city,
            limit,
        } = req.query;

        const query = {};

        if (end_year) query.end_year = end_year;
        if (topic) query.topic = topic;
        if (sector) query.sector = sector;
        if (region) query.region = region;
        if (pestle) query.pestle = pestle;
        if (source) query.source = source;
        if (swot) query.swot = swot;
        if (country) query.country = country;
        if (city) query.city = city;

        // Filter out empty strings if any
        Object.keys(query).forEach((key) => {
            if (query[key] === "") delete query[key];
        });

        const insights = await Insight.find(query).limit(Number(limit) || 100); // Default limit 100 to avoid heavy load
        res.json(insights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
