import { ShoppingCart, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Feed", badge: "BETA" },
  { label: "Explore" },
  { label: "Beats", hasChevron: true },
  { label: "Top Charts" },
  { label: "Search by Sound" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-widest">
            <Headphones className="h-6 w-6 text-primary" />
            <span>AIRBIT</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              >
                {item.label}
                {item.badge && (
                  <span className="rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background">
                    {item.badge}
                  </span>
                )}
                {item.hasChevron && <span className="text-xs">▾</span>}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground md:inline">
            Sell Beats
          </a>
          <a href="#" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground md:inline">
            Creator Hub
          </a>
          <a href="#" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground md:inline">
            Sign Up
          </a>
          <button
            aria-label="Cart"
            className="rounded-md p-2 text-foreground/80 transition hover:bg-secondary hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
