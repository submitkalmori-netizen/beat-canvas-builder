import { useEffect, useState } from "react";
import { getPeaks } from "./peakCache";

interface MiniWaveformProps {
  url: string;
  active: boolean;
  playing: boolean;
  bars?: number;
}

// Deterministic fallback shape used while real peaks are loading.
const fallback = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const v = Math.sin(i * 12.9898) * 43758.5453;
    return 0.35 + (v - Math.floor(v)) * 0.65;
  });

const MiniWaveform = ({ url, active, playing, bars = 28 }: MiniWaveformProps) => {
  const [peaks, setPeaks] = useState<number[]>(() => fallback(bars));

  useEffect(() => {
    let cancelled = false;
    getPeaks(url, bars)
      .then((p) => {
        if (!cancelled && p.length) setPeaks(p);
      })
      .catch(() => {
        // Keep the fallback on failure
      });
    return () => {
      cancelled = true;
    };
  }, [url, bars]);

  return (
    <div className="flex h-6 w-full items-center gap-[2px]" aria-hidden>
      {peaks.map((h, i) => (
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
