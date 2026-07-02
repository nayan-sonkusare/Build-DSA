import React from "react";

export default function Home() {
  return (
    <div className="relative min-h-[91vh] flex items-center justify-center overflow-hidden px-6">

      {/* BACKGROUND ANIMATED BLOBS */}
      <div className="absolute -top-40 -left-32 w-80 h-80 bg-orange-500/30 rounded-full blur-3xl animate-floatSlow"></div>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-floatReverse"></div>
      <div className="absolute -top-40 left-2/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-floatReverse"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl text-center space-y-7 animate-fadeUp">

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            Build
          </span>
          -DSA
        </h1>

        {/* SUB TITLE */}
        <p className="text-base md:text-lg opacity-90 leading-relaxed max-w-2xl mx-auto">
          Create your own <span className="font-semibold">personal DSA sheet</span>  
          and track coding problems from multiple platforms in one place.
        </p>

        {/* PLATFORM LOGOS (REPLACED TEXT) */}
        <div className="flex justify-center items-center gap-6 pt-2">
          <img
            src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000"
            alt="LeetCode"
            className="h-10 md:h-11 hover:scale-105 transition-transform duration-300 "
          />
          <img
            src="https://img.icons8.com/?size=100&id=Wq4dyyhFKRz6&format=png&color=000000"
            alt="CodeChef"
            className="h-10 md:h-12 hover:scale-105 transition-transform duration-300 "
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
            alt="GeeksforGeeks"
            className="h-8 md:h-10 hover:scale-105 transition-transform duration-300 "
          />
          <img
            src="https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000"
            alt="Codeforces"
            className="h-10 md:h-12 hover:scale-105 transition-transform duration-300 "
          />
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm md:text-base opacity-80 max-w-xl mx-auto">
          Organize topics, add problems, mark them solved,  
          and visualize your overall progress with clean analytics.
        </p>

        {/* CTA */}
        <div className="pt-4">
          <a
            href="/LeetCode"
            className="
              relative inline-flex items-center justify-center
              px-8 py-4 rounded-xl
              bg-orange-500 text-white font-semibold
              transition-all duration-300
              hover:scale-105 hover:shadow-lg
              after:absolute after:inset-0 after:rounded-xl
              after:bg-orange-500/30 after:blur-xl after:-z-10
            "
          >
            Start Building My Sheet
          </a>
        </div>
      </div>
    </div>
  );
}
