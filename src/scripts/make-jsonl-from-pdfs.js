import fs from "fs";
import pdf from "pdf-parse";
import path from "path";

const pdfPath = path.resolve("data/reference_pdfs/dsa_reference.pdf");
const outputDir = path.resolve("data/prepared");
const trainFile = path.join(outputDir, "finetune.jsonl");
const evalFile = path.join(outputDir, "eval.jsonl");

// Utility: write JSONL line by line
function writeJSONL(filePath, dataArray) {
  fs.writeFileSync(filePath, "");
  dataArray.forEach((d) =>
    fs.appendFileSync(filePath, JSON.stringify(d) + "\n")
  );
  console.log(`✅ File written: ${filePath}`);
}

async function extractTextFromPDF() {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  return data.text;
}

function createQAPairs(text) {
  // Split text by sections (basic split, can improve later)
  const sections = text.split(/\n\s*\n/).filter((s) => s.length > 100);

  const pairs = [];
  for (let i = 0; i < sections.length; i++) {
    const snippet = sections[i].trim();
    const question = `Explain this DSA concept clearly: ${snippet
      .split(" ")
      .slice(0, 8)
      .join(" ")}...`;
    const answer = snippet;
    pairs.push({
      messages: [
        {
          role: "system",
          content: "You are a Computer Science tutor specialized in DSA.",
        },
        { role: "user", content: question },
        { role: "assistant", content: answer },
      ],
    });
  }

  // Split into train/eval sets (90%/10%)
  const trainSize = Math.floor(pairs.length * 0.9);
  const trainData = pairs.slice(0, trainSize);
  const evalData = pairs.slice(trainSize);

  writeJSONL(trainFile, trainData);
  writeJSONL(evalFile, evalData);
}

async function main() {
  try {
    const text = await extractTextFromPDF();
    console.log("✅ PDF text extracted, length:", text.length);
    createQAPairs(text);
    console.log("🎯 Dataset ready for fine-tuning.");
  } catch (err) {
    console.error("❌ Error preparing dataset:", err.message);
  }
}

main();
