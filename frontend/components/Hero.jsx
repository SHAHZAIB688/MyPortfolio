"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Hero = () => {
  const careers = ['Youtuber', 'Developer', 'Freelancer', 'Instructor'];
  const [textIndex, setTextIndex] = useState(0);
  const [subTextIndex, setSubTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 100 : 200;
    const currentWord = careers[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && subTextIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && subTextIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % careers.length);
      } else {
        setSubTextIndex((prev) => prev + (isDeleting ? -1 : 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [subTextIndex, isDeleting, textIndex]);

  const currentWord = careers[textIndex];
  const isVowel = ['A','E','I','O','U'].includes(currentWord.charAt(0));
  const prefix = isVowel ? 'an' : 'a';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              Hey I'm SHAHZAIB.
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 min-h-[50px] md:min-h-[80px] whitespace-nowrap overflow-hidden"
            >
              <h1>
                I am <span className="text-gradient">{prefix} {currentWord.substring(0, subTextIndex)}</span><span className="animate-pulse text-blue-500">|</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            >
              I am a full-stack MERN developer passionate about coding, crafting user-friendly websites, and continuous learning.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="#project" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all transform hover:scale-105">
                View Projects
              </a>
              <a href="https://wa.me/923086423719?text=Hi%20Shahzaib,%20I%20would%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full glass hover:bg-white/10 font-medium transition-all">
                Hire Me
              </a>
              <div className="flex items-center space-x-4 ml-2 md:ml-6">
                <a href="https://github.com/SHAHZAIB688" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-white/10 hover:text-blue-500 transition-all">
                  <FiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/shahzaib-ashraf-b28267342/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-white/10 hover:text-blue-500 transition-all">
                  <FiLinkedin size={20} />
                </a>
                <a href="mailto:malikshahzaib688343@gmail.com" className="p-3 rounded-full glass hover:bg-white/10 hover:text-blue-500 transition-all">
                  <FiMail size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-tr from-blue-500 to-violet-500 shadow-[0_0_60px_rgba(59,130,246,0.3)]">
              <img 
                src="/images/aboutimg.jpg" 
                alt="Shahzaib Hero" 
                className="w-full h-full object-cover rounded-full border-4 border-slate-900 glass"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Hero+Image' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default Hero;
