import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFParse } from "pdf-parse";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const topic = formData.get("topic") as string;
    const language = formData.get("language") as string;
    const skillLevel = formData.get("skillLevel") as string;
    const numQuestions = formData.get("numQuestions") as string;
    const file = formData.get("file") as File | null;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured on the server." }, { status: 500 });
    }

    if (!topic && !file) {
      return NextResponse.json({ error: "Either a topic or a PDF file must be provided." }, { status: 400 });
    }

    let pdfText = "";
    if (file && file.type === "application/pdf") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const parser = new PDFParse({ data: buffer });
      const parsed = await parser.getText();
      pdfText = parsed.text;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `
You are an expert quiz creator. Generate a quiz based on the following context.
    
Context:
${topic ? `Topic: ${topic}` : ""}
${pdfText ? `Source Document Text: ${pdfText.substring(0, 30000)}` : ""}

Requirements:
- Language: ${language || "English"}
- Difficulty / Skill Level: ${skillLevel || "Intermediate"}
- Number of questions: ${numQuestions || 5}
- Format questions and options in Markdown. If the question or option contains code snippets, strictly wrap them inside triple backticks with the correct language (e.g., \`\`\`javascript ... \`\`\`).
- Return the response strictly as a JSON array of objects.
- Each object must have the following structure:
  {
    "text": "The question text (supports markdown)",
    "options": ["Option A (supports markdown)", "Option B", "Option C", "Option D"],
    "correctOption": 0, // Integer index (0-3) of the correct option
    "timeLimit": 30 // Recommended time limit in seconds
  }
- Do NOT wrap the JSON array in markdown formatting like \`\`\`json. Return only the raw JSON array.
- Make sure "correctOption" is an integer between 0 and 3.
- Make sure options has exactly 4 items unless it's True/False.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up markdown wrapping if the model ignored the instruction
    text = text.replace(/^```(json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    
    const questions = JSON.parse(text);

    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions", details: error.message },
      { status: 500 }
    );
  }
}
