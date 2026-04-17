import { Play, Pause, SkipBack, SkipForward, Volume2, X, BadgeCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import artwork from "@/assets/beat-artwork.jpg";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "./PlayerContext";

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const PlayerBar = () => {
  const { current, isPlaying, toggle, stop } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const duration = 180; // mocked
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && current) {
      intervalRef.current = window.setInterval(() => {
        setProgress((p) => (p >= duration ? 0 : p + 1));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, current]);

  useEffect(() => {
    setProgress(0);
  }, [current?.title]);

  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-6">
        {/* Track info */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none md:w-72">
          <img src={artwork} alt={current.title} className="h-12 w-12 rounded-md object-cover" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">{current.title}</div>
            <div className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              {current.artist}
              {current.verified && <BadgeCheck className="h-3 w-3 fill-primary text-background" />}
            </div>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button aria-label="Previous" className="hidden text-muted-foreground hover:text-foreground sm:block">
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={toggle}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <button aria-label="Next" className="hidden text-muted-foreground hover:text-foreground sm:block">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
          <div className="hidden w-full max-w-xl items-center gap-2 text-xs text-muted-foreground md:flex">
            <span className="tabular-nums">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              onValueChange={(v) => setProgress(v[0])}
              className="flex-1"
            />
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume + close */}
        <div className="hidden items-center gap-2 md:flex md:w-48">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider value={[volume]} max={100} step={1} onValueChange={(v) => setVolume(v[0])} />
        </div>
        <button
          onClick={stop}
          aria-label="Close player"
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PlayerBar;
