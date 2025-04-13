import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { useLocation } from "react-router-dom";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
              variant={location.pathname === "/about" ? "secondary" : "link"}
            >
              About
            </Button>
          </Link>
          <Link className="text-sm" to="/contact">
            <Button
              className="h-8"
              variant={location.pathname === "/contact" ? "secondary" : "link"}
            >
              Contact
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/87940040?v=4" alt="@shadcn" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="w-full">
                <Link className="flex w-full items-center cursor-pointer gap-2" to="/profile">
                  <DropdownMenuItem className="w-full cursor-pointer">
                    <User />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <CreditCard />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <Link className="flex w-full items-center cursor-pointer gap-2" to="/profile/settings">
                  <DropdownMenuItem className="w-full cursor-pointer">
                    <Settings />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Keyboard />
                  <span>Keyboard shortcuts</span>
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link className="flex w-full items-center cursor-pointer gap-2" to="/login">
                <DropdownMenuItem className="w-full cursor-pointer">
                  <LogOut />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
