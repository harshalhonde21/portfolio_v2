export function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none bg-repeat opacity-10"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          hsl(var(--primary) / 0.1) 2px,
          hsl(var(--primary) / 0.1) 4px
        )`,
      }}
    />
  );
}
