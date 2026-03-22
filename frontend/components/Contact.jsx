"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiLoader, FiCheckCircle } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-slate-800/50 border-y border-white/5">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Contact <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FiCheckCircle className="w-20 h-20 text-green-500 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 text-lg">Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Email Subject" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Your Message" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
              </div>
              <div className="text-center md:text-left">
                <button type="submit" disabled={status === "loading"} className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all inline-flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === "loading" ? "Sending..." : "Submit Message"}
                  {status === "loading" ? <FiLoader className="w-5 h-5 animate-spin" /> : <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </div>
              {status === "error" && <p className="text-red-400 mt-2">Failed to send message. Please try again.</p>}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;
