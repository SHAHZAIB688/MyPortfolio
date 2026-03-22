"use client";
import { motion } from "framer-motion";
import { FiCode, FiLayout, FiDatabase, FiServer, FiTool, FiZap } from "react-icons/fi";

const services = [
  { icon: <FiLayout className="w-8 h-8 text-blue-400" />, title: "Frontend Development", desc: "Building responsive, accessible, and dynamic interfaces using React, Next.js, and Tailwind CSS." },
  { icon: <FiServer className="w-8 h-8 text-violet-400" />, title: "Backend Development", desc: "Developing scalable REST APIs and secure authentication systems with Node.js and Express." },
  { icon: <FiDatabase className="w-8 h-8 text-green-400" />, title: "Database Design", desc: "Structuring and optimizing NoSQL databases like MongoDB to handle high volume data efficiently." },
  { icon: <FiCode className="w-8 h-8 text-yellow-400" />, title: "MERN Full Stack", desc: "End-to-end web application development connecting robust backends with sleek frontends." },
  { icon: <FiTool className="w-8 h-8 text-orange-400" />, title: "Bug Fixing & Maintenance", desc: "Auditing existing codebases for performance issues and resolving complex logical errors." },
  { icon: <FiZap className="w-8 h-8 text-red-400" />, title: "Performance Optimization", desc: "Enhancing SEO, loading speeds, and overall responsiveness for better user experiences." }
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-gradient">Services</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 pointer-events-none">
                 {service.icon}
              </div>
              <div className="mb-6 p-4 rounded-xl bg-slate-800/50 inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
