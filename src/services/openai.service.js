import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCompletion(prompt) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content: "You are an intelligent multi-view education explainer.",
      },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}
