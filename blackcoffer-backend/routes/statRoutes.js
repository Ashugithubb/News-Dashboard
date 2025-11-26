import express from "express";
import Insight from "../models/Insight.js";

const router = express.Router();

// GET /api/insights/stats
router.get("/stats", async (req, res) => {
    try {
        // Total insights count
        const totalInsights = await Insight.countDocuments();

        // Average Intensity
        const avgIntensity = await Insight.aggregate([
            { $match: { intensity: { $ne: null } } },
            { $group: { _id: null, avg: { $avg: "$intensity" } } }
        ]);

        // Average Likelihood
        const avgLikelihood = await Insight.aggregate([
            { $match: { likelihood: { $ne: null } } },
            { $group: { _id: null, avg: { $avg: "$likelihood" } } }
        ]);

        // Total unique countries
        const totalCountries = await Insight.distinct("country");

        res.json({
            totalInsights,
            avgIntensity: avgIntensity[0]?.avg || 0,
            avgLikelihood: avgLikelihood[0]?.avg || 0,
            totalCountries: totalCountries.length || 0
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
