import { ImageResponse } from "next/og";
import { getContestDetail } from "@/actions/contest";

export const runtime = "nodejs";

export const alt = "Contest Details";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await getContestDetail(id);

  if (!res.success || !res.contest) {
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
          Contest Not Found
        </div>
      ),
      { ...size }
    );
  }

  const contest = res.contest;
  const startTime = new Date(contest.startTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

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
          border: "20px solid #f97316",
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
          <span style={{ fontSize: 32, fontWeight: "bold", color: "#f97316" }}>Algo-fox Arena</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "40px" }}>
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "20px",
              lineHeight: 1.1,
            }}
          >
            {contest.title}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              marginBottom: "40px",
              maxWidth: "800px",
            }}
          >
            {contest.description || "Join this exciting coding contest and showcase your skills!"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(249, 115, 22, 0.1)",
            padding: "20px 30px",
            borderRadius: "16px",
            border: "1px solid rgba(249, 115, 22, 0.3)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 18, color: "#f97316", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "4px" }}>
              Starts On
            </span>
            <span style={{ fontSize: 28, fontWeight: "600" }}>{startTime}</span>
          </div>
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
