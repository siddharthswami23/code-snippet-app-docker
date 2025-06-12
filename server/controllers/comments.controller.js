const axios = require("axios");
const Comment = require("../models/comments.model");
const SNIPPET_URL = process.env.SNIPPET_URL

const addComment = async (req, res) => {
  const { text, snippetId } = req.body;

  try {
    const response = await axios.get(`${SNIPPET_URL}/api/snippet/get/${snippetId}`);
    const snippet = response.data;

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    const newComment = new Comment({ text, snippetId });
    await newComment.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });

  } catch (error) {
    console.log("Error adding comment:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getCommentsBySnippetId = async (req, res) => {
  const { snippetId } = req.params;

  try {
    const comments = await Comment.find({ snippetId });

    if (comments.length === 0) {
      return res.status(200).json({
        comments: [],
        message: "No comments added yet",
      });
    }

    return res.status(200).json({ comments });
  } catch (error) {
    console.log("Error fetching comments:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = { addComment, getCommentsBySnippetId };