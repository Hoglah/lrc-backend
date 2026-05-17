// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
