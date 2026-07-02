import React from "react";

export default function LoginAnimation() {
  return (
    <div className="text-center space-y-5 bg-black py-10 px-7">

      {/* HEADING */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Build
        </span>
        -DSA
      </h1>

      {/* SUB TITLE */}
      <p className="text-sm md:text-base opacity-100 max-w-md mx-auto px-3">
        Track and manage your coding journey across platforms
      </p>

      {/* PLATFORM ICONS */}

      <div className="flex justify-center items-center gap-6 pt-2">
        <img
          src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000"
          alt="LeetCode"
          className="h-9 hover:scale-110 transition"
        />
        <img
          src="https://img.icons8.com/?size=100&id=Wq4dyyhFKRz6&format=png&color=000000"
          alt="CodeChef"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
          alt="GeeksforGeeks"
          className="h-8 hover:scale-110 transition"
        />
        <img
          src="https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000"
          alt="Codeforces"
          className="h-10 hover:scale-110 transition"
        />
      </div>
    </div>
  );
}
