import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

// If using Vite:
const API = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api/sheet` : "http://localhost:4000/api/sheet";

export default function Home() {
  const [user, setUser] = useState(null);
  
  // States to hold the dynamic data from the database
  const [stats, setStats] = useState({ totalSolved: 0, totalProblems: 0 });
  const [platformStats, setPlatformStats] = useState({
    LeetCode: { solved: 0, total: 0 },
    CodeChef: { solved: 0, total: 0 },
    GeeksforGeeks: { solved: 0, total: 0 },
    Codeforces: { solved: 0, total: 0 }
  });

  // Helper to safely match your database platform names to the UI card names
  const getUIName = (dbName) => {
    const name = dbName.toLowerCase();
    if (name.includes("leetcode")) return "LeetCode";
    if (name.includes("codechef")) return "CodeChef";
    if (name.includes("gfg") || name.includes("geeks")) return "GeeksforGeeks";
    if (name.includes("codeforce")) return "Codeforces";
    return dbName;
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);

    const fetchStats = async () => {
      if (!currentUser?.id) return;

      try {
        const res = await fetch(`${API}/${currentUser.id}`);
        if (!res.ok) throw new Error("Failed to fetch sheet");
        
        const data = await res.json();
        
        let globalTotal = 0;
        let globalSolved = 0;
        
        // Start with empty stats so we don't carry over old data
        const newPlatformStats = {
          LeetCode: { solved: 0, total: 0 },
          CodeChef: { solved: 0, total: 0 },
          GeeksforGeeks: { solved: 0, total: 0 },
          Codeforces: { solved: 0, total: 0 }
        };

        if (data.platforms) {
          data.platforms.forEach(plat => {
            const uiName = getUIName(plat.platform);
            
            // Ensure the platform exists in our object
            if (!newPlatformStats[uiName]) {
              newPlatformStats[uiName] = { solved: 0, total: 0 };
            }

            let platTotal = 0;
            let platSolved = 0;

            // Loop through Topics
            (plat.topics || []).forEach(topic => {
              // Count main topic problems
              (topic.problems || []).forEach(prob => {
                platTotal++;
                if (prob.solved) platSolved++;
              });
              
              // Count subtopic problems
              (topic.subTopics || []).forEach(sub => {
                (sub.problems || []).forEach(prob => {
                  platTotal++;
                  if (prob.solved) platSolved++;
                });
              });
            });

            // Update individual platform math
            newPlatformStats[uiName].total = platTotal;
            newPlatformStats[uiName].solved = platSolved;
            
            // Add to grand total
            globalTotal += platTotal;
            globalSolved += platSolved;
          });
        }

        // Update the React State with the real database numbers
        setStats({ totalSolved: globalSolved, totalProblems: globalTotal });
        setPlatformStats(newPlatformStats);

      } catch (err) {
        console.error("Error loading home stats:", err);
      }
    };

    fetchStats();
  }, []);

  const platforms = [
    {
      name: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      path: "/LeetCode",
      color: "border-t-orange-500"
    },
    {
      name: "CodeChef",
      logo: "https://img.icons8.com/?size=100&id=Wq4dyyhFKRz6&format=png&color=000000",
      path: "/CodeChef",
      color: "border-t-red-500"
    },
    {
      name: "GeeksforGeeks",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
      path: "/GFG",
      color: "border-t-green-600"
    },
    {
      name: "Codeforces",
      logo: "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000",
      path: "/Codeforces",
      color: "border-t-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
     

      <main className="max-w-7xl mx-auto py-8 space-y-8 px-10 md:px-10">
        {/* ================= GLOBAL STATS BANNER ================= */}
        <div className="card bg-base-100 shadow-xl p-6 border border-base-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.name || "Coder"}! 👋
              </h1>
              <p className="text-sm opacity-70 mt-1">
                Keep the momentum going. Consistency beats talent!
              </p>
            </div>
            
            {/* Master Progress Display */}
            <div className="text-center md:text-right">
              <div className="text-sm font-semibold opacity-80">Overall Completion</div>
              <div className="text-3xl font-black text-primary">
                {stats.totalSolved} <span className="text-xl font-normal opacity-50">/ {stats.totalProblems}</span>
              </div>
              <progress 
                className="progress progress-primary w-48 mt-2" 
                value={stats.totalSolved} 
                // Prevent dividing by zero if the user has no problems yet
                max={stats.totalProblems || 1}
              ></progress>
            </div>
          </div>
        </div>

        {/* ================= PLATFORMS CARD GRID ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4 px-1">Select a Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((p) => {
              const pStats = platformStats[p.name] || { solved: 0, total: 0 };

              return (
                <div 
                  key={p.name} 
                  className={`card bg-base-100 shadow-md hover:shadow-xl transition-all duration-200 border-t-4 ${p.color} hover:-translate-y-1`}
                >
                  <div className="card-body items-center text-center p-6">
                    <img src={p.logo} alt={p.name} className="h-14 w-14 object-contain mb-4" />
                    <h3 className="card-title text-lg font-bold mb-2">{p.name}</h3>
                    
                    {/* Platform Specific Progress Tracker */}
                    <div className="w-full mt-2 mb-4">
                      <div className="flex justify-between text-xs font-semibold mb-1 opacity-80">
                        <span>Solved</span>
                        <span>{pStats.solved} / {pStats.total}</span>
                      </div>
                      <progress 
                        className="progress progress-success w-full" 
                        value={pStats.solved} 
                        max={pStats.total || 1}
                      ></progress>
                    </div>
                    
                    <div className="card-actions w-full">
                      <a 
                        href={p.path} 
                        className="btn btn-outline btn-primary btn-sm w-full font-bold"
                      >
                        Open Sheet
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}