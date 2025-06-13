import { AppContext } from "@/context/AppContext";
import { useContext, useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Snippet {
  _id: string;
  title: string;
  code: string;
  createdBy: string; // user ID
}

const Home = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("AppContext is undefined");

  const { user, userId } = appContext;

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    if (userId === null) navigate("/login");
  }, [userId]);

  useEffect(() => {
    const getSnippets = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/snippet/getSnippet",
          { userId }
        );
        setSnippets(response.data);
      } catch (error) {
        console.log("Error fetching snippets:", error);
      }
    };

    if (userId) {
      getSnippets();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/snippet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          code,
          createdBy: userId,
        }),
      });

      const newSnippet = await res.json();
      setSnippets((prev) => [...prev, newSnippet]);
      setTitle("");
      setCode("");
    } catch (err) {
      console.error("Error creating snippet:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-20 py-10 gap-10">
      {/* Form Card */}
      <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl capitalize truncate">
            Welcome {user?.name || "User"}
          </CardTitle>
          <CardDescription>Add new snippet</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Async/Await Example"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                placeholder="Type your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-base py-5 mt-5">
              Create Snippet
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Snippet List */}
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
          Your Snippets
        </h2>
        {snippets.length === 0 ? (
          <p className="text-gray-600 text-center sm:text-left">
            No snippets found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {snippets.map((snippet) => (
              <Card key={snippet._id} className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg truncate">
                    {snippet.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="border p-3 rounded overflow-x-auto text-sm whitespace-pre-wrap">
                    {snippet.code}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
