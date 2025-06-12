const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    snippetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet',
        required: true,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
