const mongoose = require('mongoose')

const message = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: String,
    reciever: String,
    admin_id: String,
    user_name: String,
    admin_name: String,
    user_id: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})
const Message = mongoose.model('Message', message)

module.exports = Message