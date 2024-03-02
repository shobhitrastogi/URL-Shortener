const URL = require('../models/url');

async function handleGenereateNewShortURL(req, res) {
    // Your existing code for generating short URL
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGenereateNewShortURL,
    handleGetAnalytics
};
