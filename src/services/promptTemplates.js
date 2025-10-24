export const promptTemplates = {
  simple: (question) => `
You are an educational assistant. Explain the following concept in simple, clear language:
"${question}"
Make it short (under 7 sentences) and easy to understand.
`,

  analogy: (question) => `
Explain "${question}" using one strong real-world analogy. 
Compare it to a familiar everyday situation.
`,

  code: (question) => `
Explain "${question}" using code. 
Provide a short code example (in JavaScript) with inline comments explaining each step.
`,

  visual: (question) => `
Explain "${question}" using a visual representation. 
Describe it in a way that can be converted to a Mermaid flowchart.
For example:
flowchart TD
A[Start] --> B[Step 1]
B --> C[Step 2]
C --> D[End]
`,
};
