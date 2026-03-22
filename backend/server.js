const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Routes
const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");
const testimonialRoutes = require("./routes/testimonials");

app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Health check
app.get("/", (req, res) => {
  res.send({ status: "Portfolio Backend API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
