import { ChevronDown, List, LayoutGrid } from "lucide-react";

const filters = ["Tags", "Genre", "Price", "Mood", "Key", "Tempo BPM", "Duration", "Added"];

const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
          >
            {f}
            <ChevronDown className="h-4 w-4 opacity-60" />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1 rounded-md border border-border/60 p-1">
        <button className="rounded bg-secondary p-1.5 text-foreground" aria-label="List view">
          <List className="h-4 w-4" />
        </button>
        <button className="rounded p-1.5 text-muted-foreground hover:text-foreground" aria-label="Grid view">
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
