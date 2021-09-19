
const webSocket = (io) => io.on("connection", socket => {
    socket.on('onConnect', data => {
        io.sockets.emit('onConnect', {
            userid: data.userid,
            username: data.username,
            admin_id: '',
            admin_name: ''
        })
    })
});


module.exports = webSocket;
