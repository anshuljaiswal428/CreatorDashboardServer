const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    platform: { type: String, enum: ['Twitter', 'Reddit'], required: true },
    content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feed', feedSchema);
