const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Project = require("../models/Project");

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({ storage: storage });

const seedProjects = [
  {
    title: "MERN Stack E-Commerce", 
    description: "A full-stack e-commerce solution with cart functionality, JWT authentication, and admin dashboard.",
    image: "/images/todo.jpg", 
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Weather Dashboard", 
    description: "Real-time weather application fetching data from external APIs with location detection.",
    image: "/images/weather.jpg", 
    techStack: ["React", "Axios", "Tailwind CSS"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Task Management App", 
    description: "A modern alternative to manage tasks and projects with a responsive interface.",
    image: "/images/cal.png", 
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demoLink: "#",
    githubLink: "#",
  }
];

router.get("/", async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: 1 });
    
    if (projects.length === 0) {
      projects = await Project.insertMany(seedProjects);
    }
    
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const getAbsoluteImageUrl = (req) => {
    const proxyHost = req.headers['x-forwarded-host'] || req.get('host');
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    return `${protocol}://${proxyHost}`;
};

router.post("/", upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, demoLink, githubLink, adminCode } = req.body;
    
    if (adminCode !== process.env.ADMIN_CODE && adminCode !== "shahzaib123") {
      return res.status(401).json({ error: "Incorrect Admin Passcode" });
    }

    let imageUrl = "/images/placeholder.jpg";
    if (req.file) {
      imageUrl = `${getAbsoluteImageUrl(req)}/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const newProject = new Project({
      title,
      description,
      image: imageUrl,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()),
      demoLink,
      githubLink
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server Error" });
  }
});

router.put("/:id", upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, demoLink, githubLink, adminCode } = req.body;
    
    if (adminCode !== process.env.ADMIN_CODE && adminCode !== "shahzaib123") {
      return res.status(401).json({ error: "Incorrect Admin Passcode" });
    }

    const updateData = {
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()),
      demoLink,
      githubLink
    };

    if (req.file) {
      updateData.image = `${getAbsoluteImageUrl(req)}/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
      const { adminCode } = req.body;
      if (adminCode !== process.env.ADMIN_CODE && adminCode !== "shahzaib123") {
        return res.status(401).json({ error: "Incorrect Admin Passcode" });
      }
      await Project.findByIdAndDelete(req.params.id);
      res.json({ success: true });
  } catch(error) {
      res.status(500).json({ error: error.message || "Server Error" });
  }
});

module.exports = router;
