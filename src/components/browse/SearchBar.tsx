import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-0 overflow-hidden rounded-full border border-border/60 bg-card/60 p-1.5 shadow-lg backdrop-blur">
      <div className="flex flex-1 items-center gap-3 px-5">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search beats..."
          className="h-12 w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
      <Button className="h-12 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground hover:bg-primary/90">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
