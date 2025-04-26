const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    platform: { type: String, enum: ['Twitter', 'Reddit'], required: true },
    reason: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
