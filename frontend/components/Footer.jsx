"use client";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-wider text-gradient mb-4">SHAHZAIB.</h2>
            <p className="text-slate-400 max-w-sm">
              Transforming Ideas into Interactive Designs using modern MERN stack technologies.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/SHAHZAIB688" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-blue-600 hover:text-white transition-colors text-slate-300">
              <FiGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shahzaib-ashraf-b28267342/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-blue-600 hover:text-white transition-colors text-slate-300">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:malikshahzaib688343@gmail.com" className="p-3 rounded-full glass hover:bg-blue-600 hover:text-white transition-colors text-slate-300">
              <FiMail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col-reverse md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mt-6 md:mt-0">
            Copyright &copy; {new Date().getFullYear()} by SHAHZAIB. | All Rights Reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="text-sm font-semibold">Back to Top</span>
            <FiArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
