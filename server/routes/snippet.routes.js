const express = require('express');
const { CreateSnippet, getAllSnippets, getSnippetById } = require('../controllers/snippet.controller');
const SnippetRouter = express.Router()

SnippetRouter.post('/create', CreateSnippet)
SnippetRouter.post('/getSnippet', getAllSnippets)
SnippetRouter.get('/getSnippet/:id', getSnippetById)

module.exports = SnippetRouter