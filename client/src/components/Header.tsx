import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-16 flex items-center justify-between py-5">
      <h1 className="capitalize">welcome </h1>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
