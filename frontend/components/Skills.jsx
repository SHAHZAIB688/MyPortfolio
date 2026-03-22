"use client";
import { motion } from "framer-motion";

const skills = [
  { name: "React.js", level: 90, color: "bg-blue-400" },
  { name: "Next.js", level: 85, color: "bg-slate-200 text-slate-900" },
  { name: "Node.js", level: 80, color: "bg-green-500" },
  { name: "Express.js", level: 80, color: "bg-gray-400" },
  { name: "MongoDB", level: 85, color: "bg-green-600" },
  { name: "JavaScript", level: 90, color: "bg-yellow-400" },
  { name: "Tailwind CSS", level: 95, color: "bg-teal-400" },
  { name: "HTML/CSS", level: 95, color: "bg-orange-500" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-gradient">Skills</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-white">{skill.name}</span>
                <span className="text-slate-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-2.5 rounded-full ${skill.color}`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;
