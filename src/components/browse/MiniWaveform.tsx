interface MiniWaveformProps {
  active: boolean;
  playing: boolean;
  bars?: number;
}

// Deterministic pseudo-random bar heights so each row has a unique but stable shape
const heights = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const v = Math.sin(i * 12.9898) * 43758.5453;
    return 0.35 + (v - Math.floor(v)) * 0.65; // 0.35 - 1.0
  });

const MiniWaveform = ({ active, playing, bars = 28 }: MiniWaveformProps) => {
  const data = heights(bars);

  return (
    <div
      className="flex h-6 w-full items-center gap-[2px]"
      aria-hidden
    >
      {data.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full transition-colors ${
            active ? "bg-primary" : "bg-muted-foreground/40"
          } ${active && playing ? "mini-wave-bar" : ""}`}
          style={{
            height: `${Math.round(h * 100)}%`,
            animationDelay: `${(i % 8) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
};

export default MiniWaveform;
