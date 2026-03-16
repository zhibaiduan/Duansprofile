export default function MeshGradient() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-bg"
      aria-hidden="true"
    >
      {/* Base warm background */}
      <div className="absolute inset-0 bg-bg" />

      {/* Blob 1 — warm sand, top-left */}
      <div
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-50"
        style={{
          background: "radial-gradient(circle, #F5E6D3 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
          animation: "mesh-blob-1 20s ease-in-out alternate infinite",
        }}
      />

      {/* Blob 2 — soft terracotta, top-right */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-35"
        style={{
          background: "radial-gradient(circle, #E8C4A8 0%, transparent 70%)",
          top: "10%",
          right: "-15%",
          animation: "mesh-blob-2 25s ease-in-out alternate infinite",
        }}
      />

      {/* Blob 3 — cream, bottom-center */}
      <div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-[100px] opacity-40"
        style={{
          background: "radial-gradient(circle, #FFF3E8 0%, transparent 70%)",
          bottom: "-25%",
          left: "15%",
          animation: "mesh-blob-3 22s ease-in-out alternate infinite",
        }}
      />
    </div>
  );
}
