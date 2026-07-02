import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    // Respect system preference as fallback
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    // This is the correct way with daisyUI v5 + Tailwind v4
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/"; // Force refresh to clear state
};

  const navItems = (
    <>
      <li className="transition-all duration-100 active:scale-100 hover:scale-110 ">
        <a href="/Home">
          <img
            src="https://img.icons8.com/?size=100&id=2yfgHA8XGxvd&format=png&color=000000"
            className="w-6 h-6"
            alt="Home"
          />
          <span>Home</span>
        </a>
      </li>

      <li className="transition-all duration-100 active:scale-100 hover:scale-110">
        <a href="/LeetCode">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
            className="w-6 h-6"
            alt="LeetCode"
          />
          <span>LeetCode</span>
        </a>
      </li>

      <li className="transition-all duration-100 active:scale-100 hover:scale-110">
        <a href="/Gfg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
            className="w-6 h-6"
            alt="GeeksforGeeks"
          />
          <span>GeeksforGeeks</span>
        </a>
      </li>

      <li className="transition-all duration-100 active:scale-100 hover:scale-110">
        <a href="/Codechef">
          <img
            src="https://img.icons8.com/?size=100&id=Wq4dyyhFKRz6&format=png&color=000000"
            className="w-6 h-6"
            alt="CodeChef"
          />
          <span>CodeChef</span>
        </a>
      </li>

      <li className="transition-all duration-100 active:scale-100 hover:scale-110">
        <a href="/CodeForces">
          <img
            src="https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000"
            className="w-6 h-6"
            alt="Codeforces"
          />
          <span>Codeforces</span>
        </a>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-30 bg-base-200 pb-3 shadow-lg md:px-19 px-4">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-1 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="text-2xl font-bold cursor-pointer"><span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            Build
          </span>-DSA</a>
        </div>

        <div className="navbar-end">
          {/* Desktop menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          {/* Theme Toggle */}
          <label className="swap swap-rotate mx-4">
            {/* The magic checkbox */}
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"                        // ← tells daisyUI which theme to apply when checked
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />

            {/* Sun icon - shown when NOT checked (light mode) */}
            <svg
              className="swap-off h-8 w-8 fill-current text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon - shown when checked (dark mode) */}
            <svg
              className="swap-on h-8 w-8 fill-current text-indigo-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <button onClick={handleLogout} className="btn bg-blue-500 text-white">LogOut</button>
        </div>
      </div>
    </div>
  );
}