const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();
console.log("Key Check:", process.env.GEMINI_API_KEY ? "Key Loaded" : "Key is UNDEFINED");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const systemContext = `
      You are an AI assistant for Sumit Raj, a MERN Stack Developer and MCA student at IGNOU.
      Sumit's skills: React, Node.js, Express, MongoDB, and JavaScript.
      His projects: 1. E-commerce Platform, 2. Blog App, 3. Chat App with Socket.io.
      Keep answers short, professional, and helpful. 
      If asked for contact, suggest his GitHub: https://github.com/SumitRaj18.
    `;

    const result = await model.generateContent(systemContext + "\nUser Question: " + prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  }  catch (error) {
  if (error.status === 429) {
    return res.status(429).json({ reply: "I'm a bit overwhelmed with questions right now! Please wait a few seconds and ask again." });
  }
  console.error("Chat Error:", error);
  res.status(500).json({ error: "Failed to connect to AI" });
}
});

module.exports = router;