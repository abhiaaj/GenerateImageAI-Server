const express = require("express");
const router = express.Router();

const { generateImage, exploreImages } = require("../controllers/ImageController")

router.post("/generate-image", generateImage);
router.get("/explore-images", exploreImages);

module.exports  = router;

