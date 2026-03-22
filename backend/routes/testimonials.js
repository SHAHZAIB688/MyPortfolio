const express = require("express");
const router = express.Router();

const mockTestimonials = [
  { name: "John Doe", role: "CEO at TechCorp", text: "Shahzaib transformed our ideas into a stunning and performant web application. Highly recommended!" },
  { name: "Sarah Smith", role: "Product Manager", text: "Exceptional MERN stack skills. The quality of the code and the UI experience exactly matched our vision." },
  { name: "Mike Johnson", role: "Startup Founder", text: "Working with Shahzaib was a breeze. He delivered the project ahead of schedule with flawless execution." }
];

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get("/", (req, res) => {
  try {
    res.json(mockTestimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
