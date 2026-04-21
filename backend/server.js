require("dotenv").config(); // ✅ load env first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection using ENV
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// Schema
const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

const Form = mongoose.model("Form", FormSchema);

// API
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const data = new Form({ name, email, message });
    await data.save();

    res.status(201).json({ message: "Data Saved Successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error saving data ❌" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Use ENV PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));