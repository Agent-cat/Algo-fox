import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text");
  if (!text || text.trim().length === 0) {
    return new Response("Missing text param", { status: 400 });
  }

  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      Referer: "https://translate.google.com/",
    },
  });

  if (!res.ok) {
    return new Response(`TTS upstream failed: ${res.status}`, {
      status: res.status,
    });
  }

  const audio = await res.arrayBuffer();

  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
