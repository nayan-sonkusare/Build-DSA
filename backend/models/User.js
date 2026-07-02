import mongoose from "mongoose";

/* Problem */
const problemSchema = new mongoose.Schema({
  title: String,
  link: String,
  solved: { type: Boolean, default: false }
});

/* SubTopic */
const subTopicSchema = new mongoose.Schema({
  name: String,
  problems: [problemSchema]
});

/* Topic */
const topicSchema = new mongoose.Schema({
  name: String,
  problems: [problemSchema],
  subTopics: [subTopicSchema]
});

/* Platform */
const platformSchema = new mongoose.Schema({
  platform: String,
  topics: [topicSchema]
});

/* User */
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  sheet: {
    platforms: [platformSchema]
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
