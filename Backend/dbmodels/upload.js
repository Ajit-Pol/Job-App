const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    }
})

FileSchema.methods.createSrc = function () {
    return `data:${this.contentType};charset=utf-8;base64,${this.data}`
}

module.exports = mongoose.model('Files', FileSchema);