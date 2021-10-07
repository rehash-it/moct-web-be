const mongoose = require('mongoose')

const forum = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    need_comment: {
        type: Boolean, // turn off comments
        required: true
    },
    creater: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'live'  //'live' or closed
    },
    closed_at: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
})
const Forum = mongoose.model('forum', forum)
module.exports = Forum