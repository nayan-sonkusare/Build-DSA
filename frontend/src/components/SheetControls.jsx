import React, { useState } from "react";

export default function SheetControls({
  onAddTopic,
  onAddProblem,
  showAddTopic,
  showAddProblem,
}) {
  const [topic, setTopic] = useState("");
  const [problemName, setProblemName] = useState("");
  const [problemLink, setProblemLink] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [showProblemInput, setShowProblemInput] = useState(false);

  const reset = () => {
    setTopic("");
    setProblemName("");
    setProblemLink("");
    setShowTopicInput(false);
    setShowProblemInput(false);
  };

  // ================= MAGIC PASTE LOGIC =================
  const handleLinkChange = (e) => {
    const url = e.target.value;
    setProblemLink(url);

    // Only auto-fill if the user hasn't already typed a name
    if (!problemName && url.includes("/problems/")) {
      try {
        // Extract the part after "/problems/"
        const parts = url.split("/problems/")[1].split("/");
        const slug = parts[0]; // e.g., "binary-tree-maximum-path-sum"

        if (slug) {
          // Replace hyphens with spaces and capitalize each word
          const formattedName = slug
            .split("-")
            .filter(Boolean) // removes empty strings if there are double hyphens
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          setProblemName(formattedName);
        }
      } catch (err) {
        // Silently fail if the URL structure is weird; the user can still type manually
        console.warn("Could not auto-format URL");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {showAddTopic && (
          <button
            onClick={() => {
              setShowTopicInput(!showTopicInput);
              setShowProblemInput(false);
            }}
            className="btn bg-blue-500 text-white"
          >
            ➕ Add Topic
          </button>
        )}

        {showAddProblem && (
          <button
            onClick={() => {
              setShowProblemInput(!showProblemInput);
              setShowTopicInput(false);
            }}
            className="btn bg-blue-500 text-white"
          >
            ➕ Add Problem
          </button>
        )}
      </div>

      {/* -------- TOPIC INPUT -------- */}
      {showTopicInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (topic.trim()) onAddTopic(topic);
            reset();
          }}
          className="flex gap-3 flex-wrap"
        >
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic name"
            className="input input-bordered max-w-sm"
          />
          <button type="submit" className="btn btn-success">
            Add
          </button>
          <button type="button" onClick={reset} className="btn btn-outline">
            Cancel
          </button>
        </form>
      )}

      {/* -------- PROBLEM INPUT (WITH MAGIC PASTE) -------- */}
      {showProblemInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (problemName && problemLink) {
              onAddProblem(problemName, problemLink);
            }
            reset();
          }}
          className="flex gap-3 flex-wrap"
        >
          {/* We swapped the order here so they paste the link FIRST to trigger the magic autofill */}
          <input
            value={problemLink}
            onChange={handleLinkChange}
            placeholder="Paste problem link here..."
            className="input input-bordered max-w-sm"
          />
          <input
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
            placeholder="Problem name (Auto-fills)"
            className="input input-bordered max-w-sm"
          />
          <button type="submit" className="btn btn-success">
            Add
          </button>
          <button type="button" onClick={reset} className="btn btn-outline">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}