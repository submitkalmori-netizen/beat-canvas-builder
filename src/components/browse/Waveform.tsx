import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProps {
  url: string;
  isPlaying: boolean;
  onReady?: (duration: number) => void;
  onProgress?: (time: number) => void;
  onFinish?: () => void;
}

// Resolve an HSL CSS variable to an actual color string for canvas use.
const hsl = (varName: string, alpha = 1) => {
  if (typeof window === "undefined") return "#888";
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!raw) return "#888";
  return alpha < 1 ? `hsla(${raw} / ${alpha})` : `hsl(${raw})`;
};

const Waveform = ({ url, isPlaying, onReady, onProgress, onFinish }: WaveformProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);

  // Create / recreate when the URL changes
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: hsl("--muted-foreground", 0.5),
      progressColor: hsl("--primary"),
      cursorColor: "transparent",
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 40,
      normalize: true,
      url,
    });

    wsRef.current = ws;

    ws.on("ready", () => onReady?.(ws.getDuration()));
    ws.on("audioprocess", (t) => onProgress?.(t));
    ws.on("seeking", (t) => onProgress?.(t));
    ws.on("finish", () => onFinish?.());

    return () => {
      ws.destroy();
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Sync play / pause state
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;
    if (isPlaying) {
      // play() can reject if not ready yet; swallow the error
      ws.play().catch(() => {});
    } else {
      ws.pause();
    }
  }, [isPlaying]);

  return <div ref={containerRef} className="w-full" />;
};

export default Waveform;
