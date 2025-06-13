const Snippet = require("../models/snippet.model");

const CreateSnippet = async (req, res) => {
    const { title, code, comments, userId } = req.body;

    if (!title || !code || !userId) {
        return res.status(400).json({ message: "Title, code, and userId are required" });
    }

    try {
        const newSnippet = await Snippet.create({ title, code, comments, userId });

        res.status(201).json({
            success: true,
            message: "Snippet created successfully",
            snippet: newSnippet,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to create snippet",
            error: error.message,
        });
    }
};

const getAllSnippets = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const snippets = await Snippet.find({ userId });
    res.status(200).json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getSnippetById = async (req, res) => {
    const { id } = req.params;

    try {
        const snippet = await Snippet.findById(id);
        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }
        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ message: "Error fetching snippet", error: error.message });
    }
};

module.exports = { CreateSnippet, getAllSnippets, getSnippetById };
