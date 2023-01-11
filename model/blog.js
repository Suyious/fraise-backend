import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  draft: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  image: {
    type: String
  },
  body: [{
    type:  "head" | "para" | "quote" | "image" | "code",
    value: String | {
      url: String,
      caption: String
    }
  }]
})

export default mongoose.model("Blog", blogSchema);
