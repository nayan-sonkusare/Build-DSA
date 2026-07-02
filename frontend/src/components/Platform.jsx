// frontend/src/components/Platform.jsx
import React from "react";
import RadialProgress from "./RadialProgress";

export default function Platform({
  title = "LeetCode",
  solved = 0,
  total = 0,
  color = "text-yellow-400",
  variant = "orange",
  img, // 👈 NEW PROP
}) {
  const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

  const glowMap = {
    orange: {
      top: "bg-yellow-400/20",
      bottom: "bg-orange-500/20",
      text: "from-yellow-400 to-orange-500",
      border: "bg-orange-500",
    },
    green: {
      top: "bg-green-400/20",
      bottom: "bg-emerald-500/20",
      text: "from-green-400 to-emerald-500",
      border: "bg-emerald-500",
    },
    red: {
      top: "bg-red-400/20",
      bottom: "bg-rose-500/20",
      text: "from-red-400 to-rose-500",
      border: "bg-rose-500",
    },
    blue: {
      top: "bg-blue-400/20",
      bottom: "bg-indigo-500/20",
      text: "from-blue-400 to-indigo-500",
      border: "bg-indigo-500",
    },
  };

  const glow = glowMap[variant] || glowMap.orange;

  return (
    <div className="mx-auto px-8 md:px-19 mt-6">
      <div
        className="
          relative
          bg-base-100
          shadow-xl
          rounded-3xl
          p-5 md:p-7
          flex items-center justify-between
          overflow-hidden
          border border-base-300
        "
      >
        {/* LEFT ACCENT BORDER */}
        <div
          className="
            absolute left-1 top-2 bottom-2
            w-1.5
            rounded-3xl
      
          "
        ></div>

        {/* 🔥 DYNAMIC BACKGROUND GLOW */}
        <div
          className={`absolute -top-10 -right-10 w-70 h-70 rounded-full blur-3xl ${glow.top}`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl ${glow.bottom}`}
        ></div>

        {/* LEFT CONTENT */}
        <div className="relative z-10 flex items-center gap-4 md:gap-5 pl-1 md:pl-5">
          <img
            src={img}
            alt={title}
            className="w-12 h-13 md:w-15 md:h-16 object-contain"
          />

          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {title}
            </h1>
            <p className="text-sm md:text-base opacity-70 mt-1">
              {solved} / {total} Solved
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative z-10 scale-110 md:scale-125">
          <RadialProgress
            value={percent}
            title={`${percent}%`}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}
