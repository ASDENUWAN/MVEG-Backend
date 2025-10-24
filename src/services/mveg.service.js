import { promptTemplates } from "./promptTemplates.js";
import { generateCompletion } from "./openai.service.js";
import Explanation from "../models/Explanation.js";

export async function generateExplanation(question, view) {
  if (!promptTemplates[view]) throw new Error("Invalid view type.");

  // 1️⃣ Create the model prompt and get GPT response
  const prompt = promptTemplates[view](question);
  const answer = await generateCompletion(prompt);

  // 2️⃣ Save to Mongo asynchronously (don’t block)
  (async () => {
    try {
      const newExplanation = new Explanation({ question, view, answer });
      await newExplanation.save();
      console.log("✅ Explanation saved to MongoDB");
    } catch (error) {
      console.error("⚠️ Failed to save explanation:", error.message);
    }
  })();

  // 3️⃣ Immediately return the generated answer (fast response)
  return { question, view, answer };
}
