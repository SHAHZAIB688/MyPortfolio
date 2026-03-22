"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiPlus, FiX, FiTrash2, FiEdit2 } from "react-icons/fi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editId, setEditId] = useState(null);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    title: "", description: "", techStack: "", demoLink: "", githubLink: "", adminCode: "", image: ""
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProjects();
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("admin") === "true" || localStorage.getItem("portfolio_admin") === "true") {
      setIsAdmin(true);
      localStorage.setItem("portfolio_admin", "true");
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch(err) {
      console.error(err);
    }
  };

  const handleAddNew = () => {
    setEditId(null);
    setFormData({ title: "", description: "", techStack: "", demoLink: "", githubLink: "", adminCode: formData.adminCode, image: "" });
    setImageFile(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setFormData({
        title: project.title,
        description: project.description,
        techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack,
        demoLink: project.demoLink || "",
        githubLink: project.githubLink || "",
        adminCode: formData.adminCode,
        image: project.image || ""
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('techStack', formData.techStack);
    formDataToSend.append('demoLink', formData.demoLink);
    formDataToSend.append('githubLink', formData.githubLink);
    formDataToSend.append('adminCode', formData.adminCode);
    
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    } else {
      formDataToSend.append('image', formData.image);
    }

    try {
      const url = editId ? `${API_URL}/api/projects/${editId}` : `${API_URL}/api/projects`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend 
      });
      
      if (res.ok) {
        const savedProject = await res.json();
        if (editId) {
            setProjects(projects.map(p => p._id === editId ? savedProject : p));
        } else {
            setProjects([...projects, savedProject]);
        }
        setShowModal(false);
        setFormData({ title: "", description: "", techStack: "", demoLink: "", githubLink: "", adminCode: formData.adminCode, image: "" });
        setImageFile(null);
        setEditId(null);
      } else {
        alert("Failed to save project. Incorrect Admin Passcode.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleDelete = async (id) => {
    const adminCode = prompt("Enter Admin Passcode to delete:");
    if(!adminCode) return;
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminCode })
      });
      if(res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        alert("Failed to delete. Incorrect passcode.");
      }
    } catch(err) {
       console.error(err);
    }
  }

  return (
    <section id="project" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-gradient">Projects</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">Here are a few computational solutions I've architected using the MERN stack.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-3xl overflow-hidden group border border-white/10 hover:border-blue-500/50 transition-all flex flex-col"
            >
              <div 
                className="h-48 overflow-hidden relative cursor-pointer" 
                onClick={() => setSelectedImage(project.image)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(project); }} className="p-2 bg-blue-500/80 rounded-full text-white hover:bg-blue-600 shadow-lg">
                      <FiEdit2 />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(project._id); }} className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600 shadow-lg">
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4 flex-grow text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(project.techStack) ? project.techStack : (project.techStack || "").split(",")).map((tech, i) => (
                    tech.trim() && (
                      <span key={i} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-full border border-blue-500/20">
                        {tech.trim()}
                      </span>
                    )
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                    <FiGithub size={20} /> <span className="text-sm">Code</span>
                  </a>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors ml-auto">
                    <FiExternalLink size={20} /> <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Admin Add Project Card */}
          {isAdmin && (
            <motion.div
              className="glass rounded-3xl overflow-hidden border-dashed border-2 border-slate-600 hover:border-blue-500 transition-all flex flex-col justify-center items-center min-h-[400px] cursor-pointer bg-blue-900/10"
              onClick={handleAddNew}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-lg">
                <FiPlus size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-400">Add New Project</h3>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass w-full max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative border border-slate-700 shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
              ><FiX size={20} /></button>
              
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div> {editId ? "Edit Project" : "Add Real-Time Project"}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Project Title</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Chat Application" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Project Image</label>
                  <input type="file" accept="image/*" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500 hover:file:text-white cursor-pointer" 
                    onChange={e => setImageFile(e.target.files[0])} />
                  {editId && formData.image && <p className="text-xs text-slate-500 mt-2">Current: {formData.image.split("/").pop()}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Description</label>
                  <textarea required rows="3" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Briefly describe the project..."></textarea>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Tech Stack (comma separated)</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Live Demo Link</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 transition-colors" 
                      value={formData.demoLink} onChange={e => setFormData({...formData, demoLink: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">GitHub Repository Link</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 transition-colors" 
                      value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
                  </div>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-700">
                  <label className="block text-sm text-slate-400 mb-1">Admin Security Passcode <span className="text-red-400">*</span></label>
                  <input required type="password" className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                      value={formData.adminCode} onChange={e => setFormData({...formData, adminCode: e.target.value})} placeholder="Enter secret developer code" />
                </div>
                <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform hover:scale-[1.02]">
                  {editId ? "Update Project" : "Publish Project"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white bg-slate-800/50 hover:bg-slate-700 p-3 rounded-full z-10"
            >
              <FiX size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Full View" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Projects;
