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

const Home = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppContextProvider");
  }

  const { user } = context;

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState([]);

  // Fetch user's snippets
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/snippet/getSnippet/684ad2186127e1b349707311`
        );
        console.log(res);
        const data = await res.json();
        setSnippets(data.snippets || []);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
    };

    if (user?._id) {
      fetchSnippets();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/snippet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          code,
          createdBy: user?._id,
        }),
      });

      const newSnippet = await res.json();
      setSnippets((prev) => [...prev, newSnippet]); // Add new snippet to list
      setTitle("");
      setCode("");
    } catch (err) {
      console.error("Error creating snippet:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 gap-10">
      <Card className="w-full max-w-md shadow-lg p-6 scale-110">
        <CardHeader>
          <CardTitle className="text-2xl capitalize whitespace-nowrap">
            Welcome {user?.name || "User"}
          </CardTitle>
          <CardDescription className="capitalize">
            Add new snippet
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-6">
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
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full text-base mt-5 py-6 capitalize"
            >
              Create Snippet
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Snippet List */}
      <div className="w-full max-w-3xl px-4">
        <h2 className="text-xl font-semibold mb-4">Your Snippets</h2>
        {snippets.length === 0 ? (
          <p className="text-gray-600">No snippets found.</p>
        ) : (
          <div className="grid gap-4">
            {snippets.map((snippet) => (
              <Card key={snippet._id} className="p-4">
                <CardHeader>
                  <CardTitle className="text-lg">{snippet.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm whitespace-pre-wrap">
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
