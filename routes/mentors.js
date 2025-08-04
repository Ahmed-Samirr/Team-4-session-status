// File: routes/mentors.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/mentors.json");

router.get("/", (req, res) => {
  const data = fs.readFileSync(filePath, "utf8");
  res.json(JSON.parse(data));
});

router.post("/update", (req, res) => {
  const { mentor, slot, status } = req.body;

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!data[mentor]) {
    data[mentor] = {};
  }
  data[mentor][slot] = status;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Status updated successfully" });
});

module.exports = router;
