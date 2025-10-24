import { generateExplanation } from "../services/mveg.service.js";

/**
 * Controller for explanation generation.
 * Responds immediately with model output.
 * If DB save fails, includes a warning message.
 */
export async function getExplanation(req, res, next) {
  try {
    const { question, view } = req.body;
    if (!question || !view)
      return res.status(400).json({ error: "Question and view are required" });

    const explanation = await generateExplanation(question, view);

    res.status(200).json({
      success: true,
      message: "Explanation generated successfully",
      data: explanation,
    });
  } catch (err) {
    console.error("❌ Error generating explanation:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate explanation",
      error: err.message,
    });
  }
}
