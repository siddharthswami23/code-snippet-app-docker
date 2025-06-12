const Snippet = require("../models/snippet.model");

const CreateSnippet = async (req, res) => {
    const { title, code, comments, createdAt } = req.body;

    try {
        const newSnippet = await Snippet.create({
            title,
            code,
            comments,
            createdAt
        });

        res.status(201).json({
            success: true,
            message: "Snippet created successfully",
            snippet: newSnippet
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to create snippet",
            error
        });
    }
}


const getAllSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find({});
        res.status(200).json(snippets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });
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

module.exports = { CreateSnippet,getAllSnippets,getSnippetById }