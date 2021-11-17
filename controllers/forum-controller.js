const Forum = require('../models/forum')
const Comment = require('../models/comment')
const sendError = require('../utils/sendError')
var baseURL = require("../constants");
const getForums = async (req, res) => {
    try {
        const { status } = req.headers
        const forums = await Forum.find({ status })
        res.send(forums)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
const getForum = async (req, res) => {
    try {
        const { id } = req.params
        const forum = await Forum.findOne({ _id: id })
        res.send(forum)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
const createForum = async (req, res) => {
    try {
        const forum = req.body
        const newForum = new Forum({
            ...forum,
            files: req.files ? req.files.length ? req.files.map(f => {
                return { name: f.filename, url: baseURL.baseURL + "/uploads/" + f.filename, type: f.mimetype }
            }) : [] : [],
        })
        const save = await newForum.save()
        res.send(save)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
const updateForum = async (req, res) => {
    try {
        let { id } = req.params
        let forum = req.body
        const update = await Forum.findByIdAndUpdate(id, forum)
        res.send(update)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
const deleteForum = async (req, res) => {
    try {
        let { id } = req.params
        if (id ? true : false) {
            const del = await Forum.findByIdAndRemove(id)
            const delComment = await Comment.deleteMany({ forum_id: id })
            res.send(del)
        }
        else {
            sendError('id is not set', res)
        }
    }
    catch (err) {
        console.log(err)
        sendError('can not delete the forum internal server error', res)
    }
}
module.exports = { createForum, updateForum, deleteForum, getForums, getForum }