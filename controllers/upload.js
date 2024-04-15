const FileSchema = require('../dbmodels/upload');
const UserSchema = require('../dbmodels/auth');
const { StatusCodes } = require('http-status-codes');

const fileUpload = async (req,res)=>{
    const { originalname, mimetype, buffer, size } = req.file;
    const fileData = {
        filename: originalname,
        fileSize: size,
        contentType: mimetype,
        data: buffer.toString('base64')
    }

    const { profileId } = await UserSchema.findOne({ _id: req.user.userId }).select('profileId');
    let file = null;
    if (profileId) {
       file = await FileSchema.findByIdAndUpdate({
            _id: profileId,
        }, fileData, { new: true, runValidators: true })
    }else{
       file = await FileSchema.create(fileData);
    }

    if (!file)
        throw new Error()

    const src = await file.createSrc();

    res.status(StatusCodes.OK).json({ success: true, src: src, profileId: file?._id });
}

const getUploadFile = async (req,res)=>{
    const fileId = req.params.id;
    const file = await FileSchema.findOne({  _id: fileId });
    const src = await file.createSrc();
    res.status(StatusCodes.OK).json({ src });
}


module.exports = {
    fileUpload,
    getUploadFile
}