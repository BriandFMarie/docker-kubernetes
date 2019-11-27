// Imports
const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema({
    voteCats: {
        type: Number,
        required: true
    },
    voteDogs: {
        type: Number,
        required: true
    }
}, { collection: 'vote' });

// Exports
module.exports = mongoose.model("Vote", VoteSchema);
