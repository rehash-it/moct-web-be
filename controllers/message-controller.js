const Message = require('../models/message')
const getMessage = async (user_id, admin_id, io) => {
    const message = await Message.find({ user_id, admin_id })
    io.sockets.emit('chat', { message, user_id, admin_id })
}

const addMessage = async (chat, io) => {
    try {
        const message = new Message(chat)
        const save = await message.save()
        getMessage(save.user_id, save.admin_id, io)

    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { addMessage, getMessage }