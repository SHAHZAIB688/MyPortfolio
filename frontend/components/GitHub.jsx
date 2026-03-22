"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiUsers } from "react-icons/fi";

const GitHub = () => {
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    followers: 0,
    loading: true
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/SHAHZAIB688");
        const userData = await userRes.json();
        
        const reposRes = await fetch("https://api.github.com/users/SHAHZAIB688/repos?per_page=100");
        const reposData = await reposRes.json();
        
        let totalStars = 0;
        if(Array.isArray(reposData)) {
           totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        }

        setStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          followers: userData.followers || 0,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <section id="github" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Open <span className="text-gradient">Source</span></h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">Check out my real-time activity on GitHub, including public repositories and stars earned from the community.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-2xl text-center border-t-4 border-blue-500">
            <FiGitBranch className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h4 className="text-4xl font-bold text-white mb-2">
              {stats.loading ? "..." : stats.repos}
            </h4>
            <span className="text-slate-400">Public Repositories</span>
          </div>
          <div className="glass p-8 rounded-2xl text-center border-t-4 border-violet-500">
            <FiStar className="w-10 h-10 text-violet-400 mx-auto mb-4" />
            <h4 className="text-4xl font-bold text-white mb-2">
              {stats.loading ? "..." : stats.stars}
            </h4>
            <span className="text-slate-400">Stars Earned</span>
          </div>
          <div className="glass p-8 rounded-2xl text-center border-t-4 border-green-500">
            <FiUsers className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h4 className="text-4xl font-bold text-white mb-2">
              {stats.loading ? "..." : stats.followers}
            </h4>
            <span className="text-slate-400">Followers</span>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <img 
             src="https://ghchart.rshah.org/3b82f6/shahzaib688" 
             alt="Github contribution graph" 
             className="w-full max-w-4xl glass rounded-2xl p-4 md:p-8"
             onError={(e) => { e.target.src = 'https://via.placeholder.com/800x200?text=GitHub+Contribution+Graph' }}
          />
        </motion.div>
      </div>
    </section>
  );
};
export default GitHub;
