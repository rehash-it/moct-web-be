const sendError = require("../utils/sendError")
var baseURL = require("../constants");
const uploadFile = (req, res) => {
    try {
        const files = req.files ? req.files.length ? req.files.map(f => {
            return { name: f.filename, url: baseURL.baseURL + "/uploads/" + f.filename, type: f.mimetype }
        }) : [] : []
        res.send(files)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
module.exports = uploadFile