export default function MeshGradient() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-bg"
      aria-hidden="true"
    >
      {/* Base warm background */}
      <div className="absolute inset-0 bg-bg" />

      {/* Blob A — sage glow, top-right behind photo */}
      <div
        className="absolute blur-[160px] opacity-15"
        style={{
          background: "#5B7A52",
          width: "60vw",
          height: "70vw",
          top: "-15%",
          right: "-10%",
          borderRadius: "62% 38% 55% 45% / 48% 58% 42% 52%",
          animation: "mesh-blob-2 28s ease-in-out alternate infinite",
        }}
      />

      {/* Blob B — warm amber, top-left ambient fill */}
      <div
        className="absolute blur-[120px] opacity-25"
        style={{
          background: "radial-gradient(ellipse, #F0D4B0 0%, transparent 70%)",
          width: "85vw",
          height: "60vw",
          top: "-10%",
          left: "-15%",
          borderRadius: "42% 58% 38% 62% / 55% 45% 60% 40%",
          animation: "mesh-blob-1 22s ease-in-out alternate infinite",
        }}
      />

      {/* Blob C — golden, mid-page depth */}
      <div
        className="absolute blur-[140px] opacity-45"
        style={{
          background: "radial-gradient(ellipse, #E8C49A 0%, transparent 65%)",
          width: "70vw",
          height: "60vw",
          top: "40%",
          left: "-8%",
          borderRadius: "68% 32% 44% 56% / 38% 62% 38% 62%",
          animation: "mesh-blob-3 24s ease-in-out alternate infinite",
        }}
      />
    </div>
  );
}
