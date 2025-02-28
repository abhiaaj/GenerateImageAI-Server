const Together = require("together-ai");

const { uploadImageToDatabase } = require("../utils/index.js");

const ImageModel = require("../models/ImageModel");

const generateImage = async (req, res) => {
    try {
        const apiKey = process.env.TOGETHER_API_KEY;
        const together = new Together(apiKey);


        const { prompt } = req.body;
        let response = await together.images.create({
            prompt: prompt,
            model: "black-forest-labs/FLUX.1-schnell",
            width: 1024,
            height: 768,
            steps: 4,
            n: 1,
            response_format: "b64_json"
        });

        const base64Image = response?.data[0]?.b64_json;

        const imageUrl = await uploadImageToDatabase(base64Image);

        //const newImage = new ImageModel({ prompt, imageUrl });
        //await newImage.save();
        await ImageModel.create({ prompt, imageUrl });

        return res.status(200).json({ message: "image generated successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const exploreImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.page - limit) || 10;

        const totalImages = await ImageModel.countDocuments();
        const images = await ImageModel.find().skip((page - 1) * limit).limit(limit).sort({ createsAt: -1 });

        const returnObj = {
            images,
            totalPages: Math.ceil(totalImages / limit),
            currentPage: page
        }

        return res.status(200).json(returnObj);
    } catch (error) {
        return res.status(500).json({ error: error.message });
        console.log('error :', error.message);
    }
}

module.exports = {
    generateImage,
    exploreImages
}