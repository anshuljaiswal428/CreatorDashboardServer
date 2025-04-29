const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    credits: { type: Number, default: 0 }, // Tracks user's credit points
    profileComplete: { type: Boolean, default: false }, // Tracks if the profile is completed
    savedPosts: [
      {
        postId: String, // ID of saved post
        postContent: String, // Content of the post
        createdAt: { type: Date, default: Date.now }, // Date the post was saved
      },
    ],
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Role: admin or user
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);
