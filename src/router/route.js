const express = require("express");
const router = express.Router();
const Services = require("../controller/services");
const fetch = require("node-fetch");

// Tambahkan ini - Default headers untuk semua fetch requests
const defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
};

// Update proxy-image dengan headers
router.get("/api/v1/proxy-image", async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) return res.status(400).send("Missing url param");

        const response = await fetch(imageUrl, {
            headers: defaultHeaders
        });
        if (!response.ok) return res.status(response.status).send("Failed to fetch image");

        res.set("Content-Type", response.headers.get("content-type"));
        response.body.pipe(res);
    } catch (error) {
        console.error("Error in proxy-image:", error.message);
        res.status(500).send("Internal server error");
    }
});

// ... rest of your code

// API routes
router.get("/api/v1/ongoing/:page", Services.getOngoing);
router.get("/api/v1/completed/:page", Services.getCompleted);
router.get("/api/v1/search/:q", Services.getSearch);
router.get("/api/v1/anime-list", Services.getAnimeList);
router.get("/api/v1/detail/:endpoint", Services.getAnimeDetail);
router.get("/api/v1/episode/:endpoint", Services.getAnimeEpisode);
router.get("/api/v1/batch/:endpoint", Services.getBatchLink);
router.get("/api/v1/genres", Services.getGenreList);
router.get("/api/v1/genres/:genre/:page", Services.getGenrePage);
router.get("/api/v1/streaming/:content", Services.getEmbedByContent);

module.exports = router;
