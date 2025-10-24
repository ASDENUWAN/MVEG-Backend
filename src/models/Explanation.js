import mongoose from "mongoose";

const explanationSchema = new mongoose.Schema({
  question: { type: String, required: true },
  view: {
    type: String,
    enum: ["simple", "analogy", "code", "visual"],
    required: true,
  },
  answer: { type: String, required: true },
  code: { type: String },
  mermaid: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Explanation", explanationSchema);
