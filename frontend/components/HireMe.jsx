"use client";
import { motion } from "framer-motion";

const HireMe = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/10 skew-y-3 transform origin-bottom-left -z-10"></div>
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-12 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[64px]"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/20 rounded-full blur-[64px]"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Let's Work Together</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
            Have a project in mind or looking for a talented MERN stack developer? Let's connect and transform your ideas into exceptional digital solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
            <a href="https://wa.me/923086423719?text=Hi%20Shahzaib,%20I%20would%20like%20to%20hire%20you%20for%20a%20project!" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/30 transform hover:scale-105">
              Hire Me Now
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-semibold transition-all">
              Start Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default HireMe;
