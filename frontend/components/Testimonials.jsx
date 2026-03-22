"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const mockupTestimonials = [
  { name: "John Doe", role: "CEO at TechCorp", text: "Shahzaib transformed our ideas into a stunning and performant web application. Highly recommended!" },
  { name: "Sarah Smith", role: "Product Manager", text: "Exceptional MERN stack skills. The quality of the code and the UI experience exactly matched our vision." },
  { name: "Mike Johnson", role: "Startup Founder", text: "Working with Shahzaib was a breeze. He delivered the project ahead of schedule with flawless execution." }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(mockupTestimonials);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) setTestimonials(data);
      })
      .catch(err => console.log("Using fallback testimonials."));
  }, []);

  // Duplicate for seamless 50% loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 bg-slate-800/50 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Testimonials</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-32 before:bg-gradient-to-r before:from-slate-900 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-32 after:bg-gradient-to-l after:from-slate-900 after:to-transparent">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15
          }}
          className="flex gap-8 w-max px-4 hover:[animation-play-state:paused]"
        >
          {duplicatedTestimonials.map((t, index) => (
            <div
              key={index}
              className="glass p-8 md:p-10 rounded-3xl relative w-[300px] md:w-[400px] flex-shrink-0 flex flex-col justify-between"
            >
              <div className="text-5xl text-blue-500/20 font-serif mb-4">"</div>
              <p className="text-slate-300 italic mb-8 relative z-10 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex justify-center items-center text-white font-bold text-xl shadow-lg shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-semibold truncate">{t.name}</h4>
                  <span className="text-slate-400 text-sm truncate block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Testimonials;
