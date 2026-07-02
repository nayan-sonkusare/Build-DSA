import User from "../models/User.js";

// SIGNUP
// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    // FIX: Check if EITHER the email OR the username already exists
    const exists = await User.findOne({
      $or: [{ email: email }, { name: name }]
    });

    if (exists) {
      if (exists.email === email) {
        return res.status(400).json({ message: "Email already in use" });
      }
      if (exists.name === name) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      sheet: { platforms: [] }
    });

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { name: identifier }]
    });

    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
