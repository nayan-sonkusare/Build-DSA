import React from "react";

export default function RadialProgress({
  value = 50,
  title = "LeetCode Progress",
  color = "text-primary",
}) {
  return (
    <div className="card bg-base-200 shadow-2xl  p-2 md:p-3 flex flex-col items-center gap-6 
                    hover:scale-105 transition-transform duration-300 ">

      {/* Progress Circle */}
      <div
        className={`radial-progress ${color} bg-base-100`}
        style={{
          "--value": value,
          "--size": "5rem",
          "--thickness": "9px",
        }}
        role="progressbar"
        aria-valuenow={value}
      >
        <span className="text-xl font-bold text-base-content">
          {value}%
        </span>
      </div>
    </div>
  );
}
