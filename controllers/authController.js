// controllers/authController.js
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "yourSecretKey"; // store securely in env

// Register admin (run once to create account)
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ username, password: hashed });
    await user.save();
    res.json({ success: true, message: "Admin registered" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error registering" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Login error" });
  }
};
