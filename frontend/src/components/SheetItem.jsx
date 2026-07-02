// frontend/src/components/SheetItem.jsx
import React from "react";


const borderColorMap = {
  orange: "border-orange-500 shadow-orange-500/40",
  blue: "border-blue-500 shadow-blue-500/40",
  green: "border-green-500 shadow-green-500/40",
  red: "border-red-500 shadow-red-500/40",
};

export default function SheetItem({
  text,
  img,
  link,
  color,
  solved = false,
  onToggleSolved,
  onDelete,
}) {
  // derive small friendly domain (optional) for display
  const getDomain = (u) => {
    try {
      const url = new URL(u);
      return url.hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  return (
    <ul className={`list bg-base-200 rounded-2xl border-l-4 ${borderColorMap[color]} hover:scale-101 transition-transform duration-200`}>
      <li className="list-row flex items-center gap-3 shadow-xl">
        {/* LOGO */}
        <img src={img} alt="logo" className="size-10 rounded-box" />

        {/* TITLE / LINK */}
        <div className="flex-1 font-bold truncate cursor-pointer text-lg">
          <a
            href={link || "#"}
            target="_blank"
            rel="noreferrer"
            className="font-semibold truncate block"
            title={text}
          >
            {text}
          </a>
          {link && (
            <div className="text-xs opacity-60 mt-1">
              {getDomain(link)}
            </div>
          )}
        </div>

        {/* SOLVED BUTTON */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSolved}
            className={`btn btn-sm ${solved ? "btn-success" : "btn-outline"}`}
          >
            {solved ? "Solved" : "Solved"}
          </button>

          {/* MENU */}
          <div className="dropdown dropdown-end ml-2">
            <button tabIndex={0} className="btn btn-sm btn-ghost text-xl">
              ⋮
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu"
            >
              <li>
                <button onClick={() => { console.log("SheetItem onDelete called"); onDelete && onDelete(); }} className="btn btn-sm btn-ghost bg-red-500 w-17  transition-colors size-8 text-white hover:bg-red-600">
                Delete
                </button>

              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  );
}
