const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    header: { 
        type: String,
        required: true 
    }, // Title of the post


    description: {
        type: String, 
        required: true }, // Description/content of the post

    tags: {
      type: String,
      enum: [
        "Interview Experience",
        "Company Experience",
        "College Experience",
        "Location Experience",
      ],
      required: true,
    }, // Enum for different post categories

    details: { 
        type: String, 
        required: true }, // Additional details for the post

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user who created the post
  },
  { 
    timestamps: true 
}
);

module.exports = mongoose.model("Post", postSchema);
