const { getComment, addComment, deleteComment } = require("../controllers/comment-controller");
const { connect, disconnect } = require("../controllers/conn-controller");
const { addMessage, getMessage } = require("../controllers/message-controller");

const webSocket = (io) => io.on("connection", socket => {
    var admin_id = ''
    var user_id = ''
    socket.on('call', data => {
        io.sockets.emit('calling', {
            user_name: data.user_name,
            user_id: data.user_id,
            status: 'connecting',
            message: data.message
        })
    })
    socket.on('addConn', data => {
        connect(data.user_id, data.admin_id, data.user_name, data.admin_name, io)
        admin_id = data.admin_id
        user_id = data.user_id
    })

    socket.on('saveMessage', data => {
        data.forEach(d => {
            admin_id = d.admin_id
            user_id = d.user_id
            addMessage(d, io)
        })
    })
    socket.on('getChat', data => {
        admin_id = data.admin_id
        user_id = data.user_id
        getMessage(data.user_id, data.admin_id, io)
    })
    socket.on('getComment', data => { getComment(data, io) })
    socket.on('addComment', data => addComment(data, io))
    socket.on('delComment', data => {
        deleteComment(data, io)
    })
    socket.on('disMiss', data => {
        disconnect(data.user_id, data.admin_id, io)
    })
    socket.on("disconnect", data => {
        admin_id ? user_id ? disconnect(user_id, admin_id, io) : () => { } : () => { }
    })
});


module.exports = webSocket;
