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
    comments: {
        type: [String],
        default: [],
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;
