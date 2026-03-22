"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#project" },
    { name: "Services", href: "#services" },
    { name: "GitHub", href: "#github" },
    { name: "Reviews", href: "#testimonials" },
  ];

  return (
    <header className="fixed top-4 md:top-6 left-0 w-full z-50 px-4 xl:px-8 transition-all duration-300">
      <div className="glass mx-auto max-w-6xl rounded-full px-5 py-2 md:py-2.5 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#0A0A0F]/80">
        
        {/* Left: Logo */}
        <Link href="#home" className="flex items-center gap-1.5 text-2xl lg:text-3xl font-bold tracking-wide text-white">
          <span className="flex items-center">
            S<span className="text-violet-500 text-4xl leading-none ml-[-2px] mb-[6px]">•</span>
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-5">
          <button onClick={toggleTheme} className="text-slate-300 hover:text-white transition-colors flex items-center">
            {theme === "dark" ? <FiSun className="w-5 h-5 text-yellow-400 hover:text-yellow-300" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          <Link href="#contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-[#6b21a8] to-[#86198f] hover:from-[#581c87] hover:to-[#701a75] text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(107,33,168,0.4)]">
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="text-slate-300">
             {theme === "dark" ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5" />}
          </button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[110%] left-4 right-4 glass bg-[#0A0A0F]/95 rounded-3xl mt-2 p-6 flex flex-col space-y-4 shadow-2xl"
          >
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link onClick={() => setIsOpen(false)} href="#contact" className="w-full block text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#6b21a8] to-[#86198f] text-white font-semibold shadow-lg">
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
