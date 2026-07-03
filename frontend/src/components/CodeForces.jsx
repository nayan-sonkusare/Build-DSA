
// frontend/src/components/LeetCode.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SheetControls from "./SheetControls";
import SheetFolder from "./SheetFolder";
import SheetItem from "./SheetItem";
import Platform from "./Platform";

const LOGO = "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000";
// If using Vite:
const API = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api/sheet` : "http://localhost:4000/api/sheet";
const PLATFORM = "Codeforces";

export default function Codeforces() {
  const [rootFolders, setRootFolders] = useState([]);
  const [path, setPath] = useState([]);
  const [userId, setUserId] = useState(null);

  // keep userId up-to-date from localStorage
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("currentUser"));
    setUserId(u?.id || null);
  }, []);

  // ================= LOAD =================
  const loadSheet = async () => {
    if (!userId) {
      setRootFolders([]);
      return;
    }

    try {
      const res = await fetch(`${API}/${userId}`);
      if (!res.ok) {
        console.error("LOAD SHEET HTTP ERROR", res.status);
        setRootFolders([]);
        return;
      }
      const data = await res.json();

      const plat = data.platforms?.find(p => p.platform === PLATFORM);
      if (!plat) {
        setRootFolders([]);
        return;
      }

      const folders = (plat.topics || []).map(t => ({
        id: t._id || t.id,
        text: t.name,
        folders: (t.subTopics || []).map(s => ({
          id: s._id || s.id,
          text: s.name,
          folders: [],
          problems: (s.problems || []).map(p => ({
            id: p._id || p.id,
            text: p.title,
            link: p.link,
            solved: p.solved
          }))
        })),
        problems: (t.problems || []).map(p => ({
          id: p._id || p.id,
          text: p.title,
          link: p.link,
          solved: p.solved
        }))
      }));

      setRootFolders(folders);
    } catch (err) {
      console.error("LOAD SHEET ERROR:", err);
      setRootFolders([]);
    }
  };

  // reload when userId changes (so after login)
  useEffect(() => {
    loadSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ===== helpers =====
  const getCurrentNode = () => {
    let node = { id: "root", folders: rootFolders, problems: [] };
    for (let id of path) {
      const found = node.folders.find(f => f.id === id);
      if (!found) return node;
      node = found;
    }
    return node;
  };

  // recursive counter for any node
  const countNode = (node) => {
    if (!node) return { total: 0, solved: 0 };
    let total = 0;
    let solved = 0;

    if (Array.isArray(node.problems)) {
      total += node.problems.length;
      solved += node.problems.filter(p => p.solved).length;
    }

    if (Array.isArray(node.folders)) {
      for (const f of node.folders) {
        const c = countNode(f);
        total += c.total;
        solved += c.solved;
      }
    }

    return { total, solved };
  };

  const current = getCurrentNode();
  const level = path.length;

  // ----- IMPORTANT: compute platform totals from rootFolders (overall platform) -----
  const platformCounts = rootFolders.reduce(
    (acc, f) => {
      const c = countNode(f);
      acc.total += c.total;
      acc.solved += c.solved;
      return acc;
    },
    { total: 0, solved: 0 }
  );

  const platformTotal = platformCounts.total;
  const platformSolved = platformCounts.solved;

  // ================= ACTIONS (add/delete/toggle) =================
  const addTopic = async (name) => {
  if (!userId) return;

  // LEVEL 0 → REAL TOPIC
  if (level === 0) {
    await fetch(`${API}/topic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        platform: PLATFORM,
        topicName: name
      })
    });
  }

  // LEVEL 1 → SUBTOPIC (this is why it looked broken)
  if (level === 1) {
    await fetch(`${API}/subtopic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        platform: PLATFORM,
        topicId: path[0],   // parent topic
        subTopicName: name
      })
    });
  }

  await loadSheet();
};


  

  const addProblem = async (name, link) => {
    if (!userId) {
      alert("Not logged in");
      return;
    }
    if (!path[0]) {
      alert("Select a topic (open a topic) before adding a problem.");
      return;
    }

    const payload = {
      userId,
      platform: PLATFORM,
      topicId: path[0],
      problem: { title: name, link }
    };
    if (path.length > 1 && path[1]) payload.subTopicId = path[1];

    try {
      const res = await fetch(`${API}/problem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) {
        console.error("ADD PROBLEM ERROR", res.status, json);
        alert("Failed to add problem");
        return;
      }
      await loadSheet();
    } catch (err) {
      console.error("ADD PROBLEM EXCEPTION", err);
      alert("Add problem failed (see console)");
    }
  };

  const deleteTopic = async (id) => {
    if (!userId) return;
    try {
      const res = await fetch(`${API}/delete/topic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, platform: PLATFORM, topicId: id })
      });
      if (!res.ok) {
        console.error("DELETE TOPIC ERROR", await res.text());
        return;
      }
      await loadSheet();
    } catch (err) {
      console.error("DELETE TOPIC EXCEPTION", err);
    }
  };

  const deleteSubTopic = async (id) => {
    if (!userId) return;
    try {
      const res = await fetch(`${API}/delete/subtopic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, platform: PLATFORM, topicId: path[0], subTopicId: id })
      });
      if (!res.ok) {
        console.error("DELETE SUBTOPIC ERROR", await res.text());
        return;
      }
      await loadSheet();
    } catch (err) {
      console.error("DELETE SUBTOPIC EXCEPTION", err);
    }
  };

  const deleteProblem = async (id) => {
    if (!userId) return;
    const payload = {
      userId,
      platform: PLATFORM,
      topicId: path[0],
      problemId: id
    };
    if (path[1]) payload.subTopicId = path[1];

    try {
      const res = await fetch(`${API}/delete/problem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("DELETE PROBLEM ERROR", await res.text());
        return;
      }
      await loadSheet();
    } catch (err) {
      console.error("DELETE PROBLEM EXCEPTION", err);
    }
  };

  const toggleSolved = async (problemId) => {
    if (!userId) return;
    if (!path[0]) {
      console.warn("No topic selected for toggle");
      return;
    }

    const payload = {
      userId,
      platform: PLATFORM,
      topicId: path[0],
      problemId
    };
    if (path.length > 1 && path[1]) payload.subTopicId = path[1];

    try {
      const res = await fetch(`${API}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        console.error("TOGGLE SOLVED ERROR", await res.text());
        return;
      }
      await loadSheet();
    } catch (err) {
      console.error("TOGGLE SOLVED EXCEPTION", err);
    }
  };

  // ================= RENDER =================
  return (
    <>
      <Navbar />
      {/* PASS platform-wide totals so radial always shows overall progress */}
      <div  className="md:px-20  py-4 space-y-4">
      <Platform
        title="Codeforces"
        color="text-blue-500"
        solved={platformSolved}
        total={platformTotal}
        img={LOGO}
        variant="blue"
      />

      <div className="md:px-20 px-10 py-4 space-y-4">
        {level > 0 && (
          <button className="btn btn-sm btn-outline" onClick={() => setPath(p => p.slice(0, -1))}>
            Back
          </button>
        )}

        <SheetControls
          showAddTopic={level <= 1}
          showAddProblem={level >= 1}
          onAddTopic={addTopic}
          onAddProblem={addProblem}
        />

        <div className="space-y-2">
          {current.folders.map(folder => (
            <SheetFolder
              key={folder.id}
              text={folder.text}
              img={LOGO}
              folder={folder}
              color="blue"
              onOpen={() => setPath(p => [...p, folder.id])}
              onDelete={() => level === 0 ? deleteTopic(folder.id) : deleteSubTopic(folder.id)}
            />
          ))}

          {current.problems.map(problem => (
            <SheetItem
              key={problem.id}
              text={problem.text}
              img={LOGO}
              color="blue"
              link={problem.link}
              solved={problem.solved}
              onToggleSolved={() => toggleSolved && toggleSolved(problem.id)}
              onDelete={() => deleteProblem(problem.id)}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

