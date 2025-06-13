import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          { name, email, password }
        );

        if (response.data.success) {
          toast.success("Account created successfully!");
          localStorage.setItem("user", response.data.user);
          navigate("/");
        } else {
          toast.error(response.data.message || "Registration failed.");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          { email, password }
        );

        if (response.data.success) {
          toast.success("Login successful!");
          localStorage.setItem("user", response.data.user);
          navigate("/");
        } else {
          toast.error(response.data.message || "Login failed.");
        }
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <Card className="w-full max-w-md shadow-lg p-6 scale-120">
        <CardHeader>
          <CardTitle className="text-2xl whitespace-nowrap">
            {isSignUp ? "Create an account" : "Login to your account"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Enter your details below to create a new account"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full text-base py-6 cursor-pointer"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            variant="link"
            className="px-0 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
