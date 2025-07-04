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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

interface Snippet {
  _id: string;
  title: string;
  code: string;
  comments: string[];
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
  // console.log(snippets);

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
    const res = await axios.post("http://localhost:5000/api/snippet/create", {
      title,
      code,
      comments: [],
      userId: userId,
    });

    const newSnippet = res.data;
    if (!Array.isArray(newSnippet.comments)) {
      newSnippet.comments = [];
    }

    setSnippets((prev) => [...prev, newSnippet]);
    setTitle(""); // ✅ reset form
    setCode("");  // ✅ reset form

    toast.success("Snippet created successfully! 🚀");
  } catch (err) {
    console.error("Error creating snippet:", err);
    toast.error("Failed to create snippet.");
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
            {snippets?.map((snippet, index) => (
              <Card key={index} className="p-4">
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
                <CardFooter>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-base py-5 bg-black text-white"
                      >
                        Comments
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Comments</AlertDialogTitle>
                          {snippet.comments.length > 0 ? (
                            <div className="text-muted-foreground text-sm">
                              <ul className="list-disc pl-5">
                                {snippet.comments.map((comment, index) => (
                                  <li key={index}>{comment}</li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No comments yet.
                            </p>
                          )}
                        </AlertDialogHeader>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Add</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
