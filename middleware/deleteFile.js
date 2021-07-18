const fs = require('fs')
const path = require('path')
module.exports = deleteFile = (fileUrl) => {

    try {
        const fileName = fileUrl.split('/')[2]
        console.log(fileName)
        fs.unlinkSync(path.resolve(__dirname + './../uploads') + '\\' + fileName)
        return true
        //file removed
    } catch (err) {
        console.error(err)
        return false
    }
}