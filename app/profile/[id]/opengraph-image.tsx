import { ImageResponse } from "next/og";
import { getUserProfile } from "@/actions/dashboard.action";

export const runtime = "nodejs";

export const alt = "User Profile";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stats = await getUserProfile(id);

  if (!stats) {
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
          User Not Found
        </div>
      ),
      { ...size }
    );
  }

  const totalSolved = stats.problemsSolved;
  const streak = 0; // Fixed: Streak is handled via context normally, but let's assume 0 or fetch if available

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #121212, #1a1a1a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
          border: "20px solid #f97316",
        }}
      >
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}
        >
            {/* Avatar */}
            {stats.image ? (
                <img
                    src={stats.image}
                    width="160"
                    height="160"
                    style={{
                        borderRadius: "80px",
                        border: "4px solid #f97316"
                    }}
                />
            ) : (
                <div
                    style={{
                        width: "160px",
                        height: "160px",
                        borderRadius: "80px",
                        background: "#262626",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "64px",
                        border: "4px solid #f97316"
                    }}
                >
                    {(stats.name?.trim()?.[0] || '?').toUpperCase()}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ fontSize: 64, fontWeight: "bold", margin: 0 }}>{stats.name}</h1>
                <p style={{ fontSize: 24, color: "#a1a1aa", marginTop: "8px" }}>Coding Explorer @ Algo-fox</p>
            </div>
        </div>

        <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#262626", padding: "20px 40px", borderRadius: "16px", minWidth: "200px" }}>
                <span style={{ fontSize: 18, color: "#f97316", textTransform: "uppercase" }}>Problems Solved</span>
                <span style={{ fontSize: 48, fontWeight: "bold" }}>{totalSolved}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#262626", padding: "20px 40px", borderRadius: "16px", minWidth: "200px" }}>
                <span style={{ fontSize: 18, color: "#f97316", textTransform: "uppercase" }}>Achievements</span>
                <span style={{ fontSize: 48, fontWeight: "bold" }}>{(stats.goldBadges ?? 0) + (stats.silverBadges ?? 0) + (stats.bronzeBadges ?? 0)}</span>
            </div>
        </div>

        <div style={{ position: "absolute", top: 40, left: 80, display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "#f97316",
              borderRadius: "6px",
              marginRight: "10px",
            }}
          />
          <span style={{ fontSize: 24, fontWeight: "bold", color: "#f97316" }}>Algo-fox</span>
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
