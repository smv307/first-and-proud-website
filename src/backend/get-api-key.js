const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.static("public"));

app.get("/api/get-college-scorecard-api-key", (req, res) => {
  res.json({ apiKey: process.env.COLLEGE_SCORECARD_API_KEY });
});