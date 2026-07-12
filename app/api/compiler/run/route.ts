import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { z } from "zod";

const JUDGE0_URL = process.env.JUDGE0_URL || "http://localhost:2358";

const runRequestSchema = z.object({
  languageId: z.number(),
  code: z.string().min(1, "Code cannot be empty"),
  stdin: z.string().optional().default(""),
});

function decodeBase64(val: string | null): string {
  if (!val) return "";
  try {
    return Buffer.from(val, "base64").toString("utf-8");
  } catch {
    return val;
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Session verification
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate input fields using Zod
    const body = await req.json();
    const result = runRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { code, languageId, stdin } = result.data;

    // 3. Prepare payload for Judge0
    const encodedCode = Buffer.from(code).toString("base64");
    const encodedStdin = Buffer.from(stdin).toString("base64");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(`${JUDGE0_URL}/submissions?wait=true&base64_encoded=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: encodedCode,
        language_id: languageId,
        stdin: encodedStdin,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Judge0 execution failed: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 4. Decode base64 outputs and return
    return NextResponse.json({
      stdout: decodeBase64(data.stdout),
      stderr: decodeBase64(data.stderr),
      compile_output: decodeBase64(data.compile_output),
      status: {
        id: data.status?.id,
        description: data.status?.description || "Unknown Status",
      },
      time: data.time ? parseFloat(data.time) : 0,
      memory: data.memory || 0,
    });
  } catch (error: any) {
    console.error("Compiler API Error:", error);
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Execution timed out" }, { status: 408 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
