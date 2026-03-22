const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "/images/placeholder.jpg" },
  techStack: { type: [String], default: [] },
  demoLink: { type: String },
  githubLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
