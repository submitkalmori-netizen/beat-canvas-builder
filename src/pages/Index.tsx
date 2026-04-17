import Header from "@/components/browse/Header";
import CategoryCards from "@/components/browse/CategoryCards";
import SearchBar from "@/components/browse/SearchBar";
import FilterBar from "@/components/browse/FilterBar";
import BeatList from "@/components/browse/BeatList";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="absolute inset-x-0 top-0 -z-0 h-[600px]"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-[1400px] px-6 py-10">
          <h1 className="sr-only">Browse Beats</h1>

          {/* Top utility row */}
          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/90">Keyword Search</span>
            <label className="flex items-center gap-2">
              <Switch /> Match BPM
            </label>
            <label className="flex items-center gap-2">
              <Switch /> Ignore Vocals
            </label>
          </div>

          <CategoryCards />

          <div className="mt-8">
            <SearchBar />
          </div>

          <div className="mt-10">
            <FilterBar />
            <div className="mt-2">
              <BeatList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
