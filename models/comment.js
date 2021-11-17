const mongoose = require('mongoose')

const comment = new mongoose.Schema({
    forum_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    creater: {
        type: String,
        required: true
    },
    reply: Boolean,
    reply_id: String,
    files: [{ name: String, type: { type: String }, url: String }],
    created_at: {
        type: Date,
        default: Date.now
    }
})
const Comment = mongoose.model('comment', comment)
module.exports = Comment