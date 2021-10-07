const mongoose = require('mongoose')

const connection = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    admin_id: {
        type: String,
        required: true,
    },
    user_name: String,
    admin_name: String,
    connection_time: {
        type: Date,
        required: true
    },
    disconnected_time: Date,
    status: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})
const Connection = mongoose.model('connection', connection)
module.exports = Connection