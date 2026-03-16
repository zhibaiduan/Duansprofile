export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-grain"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain)"
          opacity="0.04"
          style={{ mixBlendMode: "multiply" }}
        />
      </svg>
    </div>
  );
}
