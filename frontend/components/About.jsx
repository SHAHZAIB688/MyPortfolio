"use client";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-slate-800/50 border-y border-white/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-violet-500 rounded-2xl -rotate-6 opacity-20"></div>
              <img 
                src="/images/aboutimg.jpg" 
                alt="Shahzaib" 
                className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Profile+Image' }}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/3"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">I'm Shahzaib, a Passionate Full-Stack Developer</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              With a keen eye for detail and a flair for crafting beautiful, user-friendly web experiences, my expertise lies in the entire MERN stack. I use modern tools like React, Next.js, and Tailwind CSS to bring creative designs to life, backed by robust Express and MongoDB structures.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Coming from a background in analytical thinking, I thrive on problem-solving, coding challenges, and continuously learning new technologies to stay ahead in the dynamic world of web development. Beyond coding, I run a YouTube channel to share my knowledge and inspire others in their coding journey.
            </p>
            
            <div className="flex gap-6">
              <div className="glass p-4 rounded-xl text-center w-32">
                <h4 className="text-3xl font-bold text-blue-400 mb-1">5+</h4>
                <p className="text-sm text-slate-400">Projects Done</p>
              </div>
              <div className="glass p-4 rounded-xl text-center w-32">
                <h4 className="text-3xl font-bold text-violet-400 mb-1">100%</h4>
                <p className="text-sm text-slate-400">Dedication</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
