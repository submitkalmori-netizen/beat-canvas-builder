import { Sparkles, Download, Crown, Gem } from "lucide-react";

const categories = [
  { label: "New Beats", Icon: Sparkles },
  { label: "Free Beats", Icon: Download },
  { label: "Pro Sellers", Icon: Crown },
  { label: "Exclusive Licenses", Icon: Gem },
];

const CategoryCards = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map(({ label, Icon }) => (
        <button
          key={label}
          className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/60 p-5 text-left transition hover:border-primary/50 hover:bg-card hover:shadow-[var(--shadow-glow)]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground/80 transition group-hover:bg-primary/20 group-hover:text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryCards;
