const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const dataPath = path.join(__dirname, "mentors.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/mentors", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading data:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
    const mentors = JSON.parse(jsonData);
    res.json(mentors);
  });
});

app.post("/toggle", (req, res) => {
  const { mentorIndex, slotIndex } = req.body;

  fs.readFile(dataPath, "utf8", (err, jsonData) => {
    if (err) {
      console.error("Error reading data:", err);
      return res.status(500).json({ success: false });
    }

    const mentors = JSON.parse(jsonData);

    const currentStatus = mentors[mentorIndex].slots[slotIndex];
    mentors[mentorIndex].slots[slotIndex] = currentStatus === "free" ? "occupied" : "free";

    fs.writeFile(dataPath, JSON.stringify(mentors, null, 2), (err) => {
      if (err) {
        console.error("Error writing data:", err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
