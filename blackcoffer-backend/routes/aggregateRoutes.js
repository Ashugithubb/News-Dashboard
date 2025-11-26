import express from "express";
import Insight from "../models/Insight.js";

const router = express.Router();

// Helper to build match stage from query params
const buildMatchStage = (query) => {
    const match = {};
    if (query.end_year) match.end_year = query.end_year;
    if (query.topic) match.topic = query.topic;
    if (query.sector) match.sector = query.sector;
    if (query.region) match.region = query.region;
    if (query.pestle) match.pestle = query.pestle;
    if (query.source) match.source = query.source;
    if (query.swot) match.swot = query.swot;
    if (query.country) match.country = query.country;
    if (query.city) match.city = query.city;

    // Filter out empty strings
    Object.keys(match).forEach(key => {
        if (match[key] === "") delete match[key];
    });

    return match;
};

// GET /api/insights/agg/intensity-by-sector
router.get("/agg/intensity-by-sector", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, sector: { $ne: "" }, intensity: { $ne: null } } },
            { $group: { _id: "$sector", avgIntensity: { $avg: "$intensity" } } },
            { $sort: { avgIntensity: -1 } },
            { $limit: 10 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/insights/agg/likelihood-by-region
router.get("/agg/likelihood-by-region", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, region: { $ne: "" }, likelihood: { $ne: null } } },
            { $group: { _id: "$region", avgLikelihood: { $avg: "$likelihood" } } },
            { $sort: { avgLikelihood: -1 } },
            { $limit: 10 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/insights/agg/relevance-by-topic
router.get("/agg/relevance-by-topic", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, topic: { $ne: "" }, relevance: { $ne: null } } },
            { $group: { _id: "$topic", avgRelevance: { $avg: "$relevance" } } },
            { $sort: { avgRelevance: -1 } },
            { $limit: 10 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/insights/agg/country-count
router.get("/agg/country-count", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, country: { $ne: "" } } },
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- NEW CHARTS ---

// 1. Year Trend (Line Chart) - Count of insights per year
router.get("/agg/year-trend", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, end_year: { $ne: "" } } },
            { $group: { _id: "$end_year", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Country Distribution (Pie Chart) - Top 5 countries
router.get("/agg/country-dist", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, country: { $ne: "" } } },
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Topic Distribution (Radar/Polar) - Top 5 topics
router.get("/agg/topic-dist", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, topic: { $ne: "" } } },
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. PEST Analysis (Bar Chart) - Count by PESTLE
router.get("/agg/pest-analysis", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, pestle: { $ne: "" } } },
            { $group: { _id: "$pestle", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Source Distribution (Bar Chart) - Top 10 sources
router.get("/agg/source-dist", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, source: { $ne: "" } } },
            { $group: { _id: "$source", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 6. Intensity Trend (Line Chart) - Avg Intensity per Year
router.get("/agg/intensity-trend", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, end_year: { $ne: "" }, intensity: { $ne: null } } },
            { $group: { _id: "$end_year", avgIntensity: { $avg: "$intensity" } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 7. Likelihood Trend (Line Chart) - Avg Likelihood per Year
router.get("/agg/likelihood-trend", async (req, res) => {
    try {
        const matchStage = buildMatchStage(req.query);
        const data = await Insight.aggregate([
            { $match: { ...matchStage, end_year: { $ne: "" }, likelihood: { $ne: null } } },
            { $group: { _id: "$end_year", avgLikelihood: { $avg: "$likelihood" } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
