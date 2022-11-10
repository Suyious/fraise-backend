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
  title: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  image: {
    type: String,
  },
  body: [{
    type:  "head" | "para" | "quote" | "image" | "quote",
	  value: String    
  }]
})

export default mongoose.model("Blog", blogSchema);
