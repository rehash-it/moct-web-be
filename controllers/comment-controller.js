const Comment = require('../models/comment')
const sendError = require('../utils/sendError')

const getComment = async (forum_id, io) => {
    const comments = await Comment.find({ forum_id })
    io.sockets.emit('comments', { data: comments, forum_id })
}
const getComments = async (req, res) => {
    try {
        let { id } = req.params
        const comments = await Comment.find({ forum_id: id })
        res.send(comments)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
const addComment = async (comment, io) => {
    try {
        const newComment = new Comment(comment)
        const save = await newComment.save()
        getComment(save.forum_id, io)
    }
    catch (err) {
        console.log(err)
    }
}
const deleteComment = async (comment, io) => {
    try {
        const comm = await Comment.findByIdAndRemove(comment._id)
        getComment(comment.forum_id, io)
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = { getComment, addComment, deleteComment, getComments }