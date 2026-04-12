import { ImageResponse } from "next/og";
import { getProblem } from "@/actions/problems";

export const runtime = "nodejs";

export const alt = "Problem Details";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#121212",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontFamily: "sans-serif",
          }}
        >
          Problem Not Found
        </div>
      ),
      { ...size }
    );
  }

  const difficultyColor = (
    {
      EASY: "#22c55e",
      MEDIUM: "#eab308",
      HARD: "#ef4444",
      CONCEPT: "#3b82f6",
    } as Record<string, string>
  )[problem.difficulty] || "#f97316";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #121212, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
          border: `20px solid ${difficultyColor}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 80,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#f97316",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          />
          <span style={{ fontSize: 32, fontWeight: "bold", color: "#f97316" }}>Algo-fox Problem</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: "bold",
                background: `${difficultyColor}20`,
                color: difficultyColor,
                padding: "4px 12px",
                borderRadius: "6px",
                textTransform: "uppercase",
                marginRight: "16px",
                border: `1px solid ${difficultyColor}40`,
              }}
            >
              {problem.difficulty}
            </span>
            <span style={{ fontSize: 24, color: "#71717a" }}>{problem.domain}</span>
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "20px",
              lineHeight: 1.1,
            }}
          >
            {problem.title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              marginBottom: "40px",
              maxWidth: "800px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {problem.description.replace(/<[^>]*>?/gm, "")}
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 40, right: 80, display: "flex", alignItems: "center" }}>
           <span style={{ fontSize: 24, color: "#71717a" }}>algofox.in</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
