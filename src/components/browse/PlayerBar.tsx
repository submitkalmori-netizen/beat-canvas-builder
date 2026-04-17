import { Play, Pause, SkipBack, SkipForward, Volume2, X, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import artwork from "@/assets/beat-artwork.jpg";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "./PlayerContext";
import Waveform from "./Waveform";

// Placeholder preview audio (used for every beat until real URLs are wired up)
const PREVIEW_URL =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112191.mp3";

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const PlayerBar = () => {
  const { current, isPlaying, toggle, stop } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    setProgress(0);
    setDuration(0);
  }, [current?.title]);

  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-6">
        {/* Track info */}
        <div className="flex min-w-0 items-center gap-3 md:w-72 md:flex-none">
          <img src={artwork} alt={current.title} className="h-12 w-12 rounded-md object-cover" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">{current.title}</div>
            <div className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              {current.artist}
              {current.verified && <BadgeCheck className="h-3 w-3 fill-primary text-background" />}
            </div>
          </div>
        </div>

        {/* Controls + waveform */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex items-center gap-2">
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

          <div className="hidden min-w-0 flex-1 items-center gap-2 text-xs text-muted-foreground md:flex">
            <span className="tabular-nums">{formatTime(progress)}</span>
            <div className="min-w-0 flex-1">
              <Waveform
                url={PREVIEW_URL}
                isPlaying={isPlaying}
                onReady={(d) => setDuration(d)}
                onProgress={(t) => setProgress(t)}
                onFinish={() => toggle()}
              />
            </div>
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume + close */}
        <div className="hidden items-center gap-2 md:flex md:w-40">
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
