import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function MyProfile() {
  const [user, setUser] = useState({ name: "Nayan Sonkusare", email: "coder@example.com" });

  useEffect(() => {
    // Grab the actual user from local storage if they are logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  // FRONTEND ONLY: Dummy data for now!
  const stats = [
    {
      platform: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      rating: 1650,
      maxRating: 1720,
      solved: 342,
      color: "border-orange-500",
      text: "text-orange-500"
    },
    {
      platform: "Codeforces",
      logo: "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000",
      rating: 1420,
      maxRating: 1500,
      solved: 128,
      color: "border-blue-500",
      text: "text-blue-500"
    },
    {
      platform: "CodeChef",
      logo: "https://img.icons8.com/?size=100&id=Wq4dyyhFKRz6&format=png&color=000000",
      rating: 1580,
      maxRating: 1610,
      solved: 85,
      color: "border-red-500",
      text: "text-red-500"
    },
    {
      platform: "GeeksforGeeks",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
      rating: "Top 5%",
      maxRating: "-",
      solved: 210,
      color: "border-green-600",
      text: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-10 py-10 space-y-8 mb:px-4">
        
        {/* Profile Header */}
        <div className="card bg-base-100 shadow-xl p-8 border border-base-300 flex flex-col md:flex-row items-center gap-6">
          
          {/* 🔥 THE FIX: Added 'flex items-center justify-center' to perfectly center the letter */}
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content w-24 rounded-full flex items-center justify-center ring ring-primary ring-offset-base-100 ring-offset-2">
              <span className="text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold">{user.name}</h1>
            <p className="opacity-70 mt-1">{user.email}</p>
            
            {/* I removed the DSA and Full Stack badges to keep it super clean! */}
          </div>
          
        </div>

        {/* Ratings Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 px-1">Platform Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {stats.map((stat, idx) => (
              <div key={idx} className={`card bg-base-100 shadow-md border-t-4 ${stat.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="card-body p-6 flex flex-row items-center justify-between">
                  
                  {/* Logo & Platform Name */}
                  <div className="flex flex-col gap-2">
                    <img src={stat.logo} alt={stat.platform} className="h-10 w-10 object-contain" />
                    <h3 className="font-bold text-lg opacity-80">{stat.platform}</h3>
                  </div>

                  {/* Stats Block */}
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-wide opacity-50">Current Rating</p>
                    <p className={`text-3xl font-black ${stat.text}`}>{stat.rating}</p>
                    
                    <div className="mt-2 flex gap-4 justify-end text-sm font-semibold opacity-70">
                      <span>Max: {stat.maxRating}</span>
                      <span>Solved: {stat.solved}</span>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
    </div>
  );
}