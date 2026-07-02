import User from "../models/User.js";

/* Helper */
const ensurePlatform = (user, platform) => {
  let plat = user.sheet.platforms.find(p => p.platform === platform);
  
  if (!plat) {
    // Push the raw object into the array first
    user.sheet.platforms.push({ platform, topics: [] });
    // Retrieve and return the actual Mongoose subdocument that was just created
    plat = user.sheet.platforms[user.sheet.platforms.length - 1];
  }
  
  return plat;
};

// ================= GET SHEET =================
export const getUserSheet = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user?.sheet || { platforms: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= ADD TOPIC =================
export const addTopic = async (req, res) => {
  try {
    const { userId, platform, topicName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const plat = ensurePlatform(user, platform);
    plat.topics.push({ name: topicName, problems: [], subTopics: [] });

    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= ADD SUBTOPIC =================
export const addSubTopic = async (req, res) => {
  try {
    const { userId, platform, topicId, subTopicName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const topic = ensurePlatform(user, platform).topics.id(topicId);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });

    topic.subTopics.push({ name: subTopicName, problems: [] });
    
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= ADD PROBLEM =================
export const addProblem = async (req, res) => {
  try {
    const { userId, platform, topicId, subTopicId, problem } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const topic = ensurePlatform(user, platform).topics.id(topicId);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });

    if (subTopicId) {
      const subTopic = topic.subTopics.id(subTopicId);
      if (!subTopic) return res.status(404).json({ success: false, message: "SubTopic not found" });
      subTopic.problems.push(problem);
    } else {
      topic.problems.push(problem);
    }

    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= TOGGLE SOLVED =================
export const toggleSolved = async (req, res) => {
  try {
    const { userId, platform, topicId, subTopicId, problemId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const topic = ensurePlatform(user, platform).topics.id(topicId);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });

    let p;
    // Safely find the problem depending on if it's in a subtopic or topic
    if (subTopicId) {
      const subTopic = topic.subTopics.id(subTopicId);
      if (subTopic) p = subTopic.problems.id(problemId);
    } else {
      p = topic.problems.id(problemId);
    }

    if (!p) return res.status(404).json({ success: false, message: "Problem not found" });

    p.solved = !p.solved;
    await user.save();

    res.json({ success: true, solved: p.solved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= DELETE TOPIC =================
export const deleteTopic = async (req, res) => {
  try {
    const { userId, platform, topicId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    ensurePlatform(user, platform).topics.id(topicId)?.deleteOne();
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= DELETE SUBTOPIC =================
export const deleteSubTopic = async (req, res) => {
  try {
    const { userId, platform, topicId, subTopicId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const topic = ensurePlatform(user, platform).topics.id(topicId);
    topic?.subTopics.id(subTopicId)?.deleteOne();

    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================= DELETE PROBLEM =================
export const deleteProblem = async (req, res) => {
  try {
    const { userId, platform, topicId, subTopicId, problemId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const topic = ensurePlatform(user, platform).topics.id(topicId);
    
    if (subTopicId) {
      topic?.subTopics.id(subTopicId)?.problems.id(problemId)?.deleteOne();
    } else {
      topic?.problems.id(problemId)?.deleteOne();
    }

    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};