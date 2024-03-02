const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { handleGenereateNewShortURL, handleGetAnalytics } = require('../controllers/url');

router.post('/', handleGenereateNewShortURL);

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        // Find the URL document with the specified shortId
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                }
            }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Redirect to the original URL
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;
