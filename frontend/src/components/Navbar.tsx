import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <NavLink to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Exoplanet Hunter</span>
          </NavLink>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}>
              Analyzer
            </NavLink>
            <NavLink to="/how-it-works" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}>
              How It Works
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}>
              About
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground transition-colors hover:text-foreground"}>
              Resources
            </NavLink>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button asChild>
            <a href="https://github.com/aditya2907/A-World-Away-Hunting-for-Exoplanets-with-AI" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
