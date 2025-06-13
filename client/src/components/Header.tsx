import { AppContext } from "@/context/AppContext";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const user = appContext?.user;

  return (
    <div className="w-full h-16 flex items-center justify-between py-5">
      <h1 className="capitalize">Welcome {user?.name || "Guest"}</h1>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        {!user ? (
          <Button onClick={() => navigate("/login")}>Login</Button>
        ) : (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
