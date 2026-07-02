import React from "react";

// 🔁 recursive counter (folders + problems)
function countProblems(folder) {
  if (!folder) return { total: 0, solved: 0 };

  let total = folder.problems.length;
  let solved = folder.problems.filter((p) => p.solved).length;

  for (let sub of folder.folders) {
    const subCount = countProblems(sub);
    total += subCount.total;
    solved += subCount.solved;
  }

  return { total, solved };
}

const borderColorMap = {
  orange: "border-orange-500 shadow-orange-500/40",
  blue: "border-blue-500 shadow-blue-500/40",
  green: "border-green-500 shadow-green-500/40",
  red: "border-red-500 shadow-red-500/40",
};

export default function SheetFolder({
  text,
  img,
  folder,
  color,
  onOpen,
  onDelete,
}) {
  const { total, solved } = countProblems(folder);

  return (
    <ul className={`list bg-base-100 rounded-2xl border-l-4 ${borderColorMap[color]} hover:scale-101 transition-transform duration-200 bg-base-200 `}>
      <li className="list-row flex items-center gap-3 shadow-xl">

        <img className="size-10 rounded-box" src={img} alt="folder" />

        <div
          className="flex-1 font-bold truncate cursor-pointer text-lg"
          onClick={onOpen}
        >
          {text}
        </div>

        <div className="text-sm font-semibold opacity-70">
          {solved} / {total}
        </div>

        <div className="dropdown dropdown-end ml-2">
          <button className="btn btn-sm btn-ghost text-xl">⋮</button>
          <ul className="dropdown-content menu ">
            <li>
              <button
                onClick={onDelete}
                className="btn btn-sm btn-ghost bg-red-500 w-17 md:w-17  transition-colors size-8 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>

      </li>
    </ul>
  );
}
