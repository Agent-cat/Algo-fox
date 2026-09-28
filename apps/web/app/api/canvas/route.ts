import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI as LangChainChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ success: false, error: "GEMINI_API_KEY is not configured." }, { status: 500 });
  }

  const { language, code, problemStatement } = await req.json();

  if (!code?.trim()) {
    return NextResponse.json({ success: false, error: "Please enter some source code" }, { status: 400 });
  }

  try {
    const model = new LangChainChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.1,
      maxOutputTokens: 16384,
    });

    const systemPrompt = `You are an expert DSA educator and animation planner.
Your job is to convert the given DSA code into a sequence of animation steps that teach the algorithm visually.

The text output is NOT executable code.
The output is ONLY a structured animation script in JSON.

--------------------------------
GOAL
--------------------------------
Explain the algorithm exactly as a teacher would.
For every logical execution step:
1. Draw the current data structures.
2. Animate every variable update.
3. Highlight the currently executing line.
4. Explain what happened in 1-4 short sentences.
5. Keep animations smooth and educational.
6. Never skip important operations.
7. Merge trivial operations together to reduce total animation count.
The explanation should be beginner friendly.

--------------------------------
SUPPORTED OBJECTS
--------------------------------
Only use these built-in objects in "animation" instructions:
- Array, Matrix, String, LinkedList, DoublyLinkedList, CircularLinkedList, Stack, Queue, Deque, PriorityQueue, HashMap, HashSet, Tree, BinaryTree, BST, Heap, Trie, Graph, Pointer, Variable, Number, Character, Window, Index, Arrow, Node, Edge

--------------------------------
ANIMATIONS
--------------------------------
Allowed animation action types:
- create, delete, move, swap, compare, highlight, unhighlight, assign, increment, decrement, push, pop, enqueue, dequeue, visit, mark, unmark, connect, disconnect, grow, shrink, fadeIn, fadeOut, zoom, focus, slide, rotatePointer, changeColor

--------------------------------
OUTPUT FORMAT (JSON)
--------------------------------
{
  "title": "Algorithm Title",
  "problem": "Brief description of the problem",
  "algorithm": "Name of the algorithm",
  "complexity": {
      "time": "O(...) time complexity",
      "space": "O(...) space complexity"
  },
  "steps": [
      {
          "id": 1,
          "line": 12,
          "caption": "Step description (1 sentence max)",
          "speech": "Educational speech explaining the step (1-4 short sentences)",
          "animation": [
              { "type": "...", "object": "...", "name": "...", "value": ... }
          ],
          "state": {
              "array": [ ... ],
              "pointer": { "left": 0, "right": 2 },
              "variables": { "sum": 7 }
          }
      }
  ]
}

--------------------------------
CAPTION RULES
--------------------------------
Maximum 1 sentence. E.g. "Move left pointer.", "Swap elements."

--------------------------------
SPEECH RULES
--------------------------------
Maximum 4 short sentences. Explain WHY. Do not simply repeat the code. Use standard double quotes and do not include raw unescaped newlines inside the speech text.

--------------------------------
STATE
--------------------------------
Each step should contain the complete visual state of variables, arrays, pointers, and data structures.

--------------------------------
OPTIMIZATION
--------------------------------
Avoid unnecessary frames. Target 10-25 animation steps (do not exceed 30 steps to prevent token bloat).
For Tree/Graph objects, use abbreviated node format: { "val": N, "left": id, "right": id } — do NOT include x/y coordinates, the renderer calculates positions automatically.

--------------------------------
ERROR HANDLING
--------------------------------
If the code is incomplete or not an algorithm, return:
{
 "error": "Unable to understand the algorithm."
}

Return ONLY JSON. No markdown backticks, no explanations. Just raw JSON.`;

    const userPrompt = `Language: ${language}
Source Code:
${code}
${problemStatement ? `Problem Statement: ${problemStatement}` : ""}`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    let text = response.content;
    if (typeof text !== "string") {
      text = JSON.stringify(text);
    }

    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      let cleanedText = text;
      cleanedText = cleanedText.replace(/"([^"\\]|\\.)*"/g, (match) => {
        return match.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
      });
      const openBraces = (cleanedText.match(/{/g) || []).length;
      const closeBraces = (cleanedText.match(/}/g) || []).length;
      const openBrackets = (cleanedText.match(/\[/g) || []).length;
      const closeBrackets = (cleanedText.match(/]/g) || []).length;
      cleanedText = cleanedText.replace(/,\s*$/, "");
      for (let i = 0; i < openBrackets - closeBrackets; i++) cleanedText += "]";
      for (let i = 0; i < openBraces - closeBraces; i++) cleanedText += "}";
      data = JSON.parse(cleanedText);
    }

    if (data.error) {
      return NextResponse.json({ success: false, error: data.error }, { status: 422 });
    }
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    console.error("AI Animation generation failed:", e);
    return NextResponse.json(
      { success: false, error: e.message || "Failed to generate animation plan" },
      { status: 500 }
    );
  }
}
