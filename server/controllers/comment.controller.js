const Snippet = require("../models/snippet.model");

const addComment = async (req, res) => {
    const { snippetId } = req.params;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ message: "Comment is required" });
    }

    try {
        const snippet = await Snippet.findById(snippetId);
        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        snippet.comments.push(comment);
        await snippet.save();

        res.status(200).json({
            message: "Comment added successfully",
            snippet,
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

const getCommentsBySnippetId = async (req, res) => {
    const { snippetId } = req.params;

    try {
        const snippet = await Snippet.findById(snippetId);
        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        res.status(200).json({
            snippetId,
            comments: snippet.comments,
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving comments", error: error.message });
    }
};

const deleteComment = async (req, res) => {
    const { snippetId, commentIndex } = req.params;

    try {
        const snippet = await Snippet.findById(snippetId);
        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        if (commentIndex < 0 || commentIndex >= snippet.comments.length) {
            return res.status(400).json({ message: "Invalid comment index" });
        }

        snippet.comments.splice(commentIndex, 1);
        await snippet.save();

        res.status(200).json({
            message: "Comment deleted successfully",
            comments: snippet.comments,
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
};

module.exports = {addComment,deleteComment,getCommentsBySnippetId}