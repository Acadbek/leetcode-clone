import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="border-b mt-3 pb-3">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link className="text-sm" to="/about">
            <Button
              className="h-8"
              variant={location.pathname === "/about" ? "secondary" : "ghost"}
            >
              About
            </Button>
          </Link>
          <Link className="text-sm" to="/profile">
            <Button
              className="h-8"
              variant={location.pathname === "/profile" ? "secondary" : "ghost"}
            >
              Profile
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button className="h-8" variant="secondary">
                Login
              </Button>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
