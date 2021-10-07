const Conn = require('../models/connection')
const sendError = require('../utils/sendError')

const getConnection = async (user_id, admin_id, io) => {
    try {
        const conn = await Conn.find({ admin_id, user_id })
        io.sockets.emit('conn', conn[0])
    }
    catch (err) {

    }
}
const getAdminConn = async (req, res) => {
    try {
        const admin_id = req.params.admin_id
        console.log(admin_id)
        if (admin_id ? true : false) {
            const conn = await Conn.find({ admin_id })
            res.send(conn.reverse())
        }
        else {
            sendError("admin id is not set", res)
        }
    }
    catch (err) {
        console.log(err)
        sendError("internal server error", res)
    }
}
const addConn = async (user_id, admin_id, user_name, admin_name, io) => {
    try {
        const saveConn = new Conn({
            user_id,
            admin_id,
            user_name,
            admin_name,
            connection_time: Date.now(),
            status: 'connected'
        })
        const save = await saveConn.save()
        getConnection(user_id, admin_id, io)
    }
    catch (err) {
        console.log(err)
    }
}
const updateConn = async (id, io, type) => {
    try {
        if (type === 'connected') {
            const update = await Conn.findByIdAndUpdate(id, {
                status: 'connected',
                connection_time: Date.now()
            })
            getConnection(update.user_id, update.admin_id, io)
        }
        else if (type === 'disconnected') {
            const update = await Conn.findByIdAndUpdate(id, {
                status: 'disconnected',
                disconnected_time: Date.now()
            })
            getConnection(update.user_id, update.admin_id, io)
        }
    }
    catch (err) {
        console.log(err)
    }
}
const connect = async (user_id, admin_id, user_name, admin_name, io) => {
    try {
        const conn = await Conn.find({ admin_id, user_id })
        conn.length ? updateConn(conn[0].id, io, 'connected') :
            addConn(user_id, admin_id, user_name, admin_name, io)
    }
    catch (err) {
        console.log(err)
    }
}
const disconnect = async (user_id, admin_id, io) => {
    const conn = await Conn.find({ admin_id, user_id })
    conn.length ? updateConn(conn[0]._id, io, 'disconnected') : () => { }
}

module.exports = { connect, disconnect, getConnection, getAdminConn }