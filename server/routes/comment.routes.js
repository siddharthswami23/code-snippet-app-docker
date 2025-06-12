const express = require('express');
const { addComment, getCommentsBySnippetId, deleteComment } = require('../controllers/comment.controller');
const CommentRouter = express.Router()

CommentRouter.post("/add/:snippetId", addComment);
CommentRouter.get("/:snippetId", getCommentsBySnippetId);
CommentRouter.post("/delete/:snippetId/:commentIndex", deleteComment);

module.exports = CommentRouter;