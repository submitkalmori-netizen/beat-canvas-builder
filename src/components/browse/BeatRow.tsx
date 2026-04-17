import { Play, ShoppingCart, MoreVertical, BadgeCheck } from "lucide-react";
import artwork from "@/assets/beat-artwork.jpg";

export interface Beat {
  title: string;
  artist: string;
  bpm: number;
  key: string;
  tags: string[];
  price: string;
  verified?: boolean;
}

const BeatRow = ({ beat }: { beat: Beat }) => {
  return (
    <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg px-3 py-3 transition hover:bg-card/60 md:grid-cols-[auto_minmax(0,2fr)_minmax(0,1.3fr)_auto]">
      <div className="relative h-14 w-14 overflow-hidden rounded-md">
        <img src={artwork} alt={beat.title} className="h-full w-full object-cover" />
        <button
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100"
        >
          <Play className="h-5 w-5 fill-foreground text-foreground" />
        </button>
      </div>

      <div className="min-w-0">
        <a href="#" className="block truncate text-[15px] font-semibold text-foreground hover:text-primary">
          {beat.title}
        </a>
        <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
          <a href="#" className="flex items-center gap-1 truncate hover:text-foreground">
            {beat.artist}
            {beat.verified && <BadgeCheck className="h-3.5 w-3.5 fill-primary text-background" />}
          </a>
          <span className="opacity-50">·</span>
          <span className="whitespace-nowrap">{beat.bpm} BPM</span>
          <span className="opacity-50">·</span>
          <span className="whitespace-nowrap">{beat.key}</span>
        </div>
      </div>

      <div className="hidden flex-wrap gap-1.5 md:flex">
        {beat.tags.map((t) => (
          <a
            key={t}
            href="#"
            className="rounded-full bg-tag px-3 py-1 text-xs text-tag-foreground transition hover:bg-secondary"
          >
            #{t}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground">
          <ShoppingCart className="h-4 w-4" />
          {beat.price}
        </button>
        <button
          aria-label="More"
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BeatRow;
