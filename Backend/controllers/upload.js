const FileSchema = require('../dbmodels/upload');
const UserSchema = require('../dbmodels/auth');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const fileUpload = async (req,res)=>{
    const { originalname, mimetype, buffer, size } = req.file;
    const userId = req.user.userId;
    const fileData = {
        filename: originalname,
        fileSize: size,
        contentType: mimetype,
        data: buffer.toString('base64')
    }

    const { profileId } = await UserSchema.findOne({ _id: userId }).select('profileId');
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

    const user = await UserSchema.findByIdAndUpdate({
        _id: userId,
    }, { profileId: file?._id }, { new: true, runValidators: true })

    if(!user)
        throw new Error();

    res.status(StatusCodes.OK).json({ success: true, src: src, profileId: file?._id });
}

const getUploadFile = async (req,res)=>{
    const fileId = req.params.id;
    const file = await FileSchema.findOne({  _id: fileId });
    const src = await file.createSrc();
    res.status(StatusCodes.OK).json({ src });
}

const deleteFile = async (req,res)=>{
    const fileId = req.params.id;
    const file = await FileSchema.findByIdAndDelete({  _id: fileId });
    if (!file)
        throw new BadRequestError(`Invalid request, file not found`);

    const user = await UserSchema.findByIdAndUpdate({
        _id: req.user.userId,
    }, { profileId: null }, { new: true, runValidators: true })

    if (!user)
        throw new BadRequestError();

    res.status(StatusCodes.OK).json({msg:"Deleted successfully"});
}

module.exports = {
    fileUpload,
    getUploadFile,
    deleteFile
}