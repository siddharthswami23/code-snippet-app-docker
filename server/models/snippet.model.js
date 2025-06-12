const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;
