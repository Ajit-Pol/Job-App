const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide compay name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, 'Please provide position'],
        maxlength:100   
    },
    location: {
        type: String,
        required: [true, 'Please provide location'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength:500
    },
    requirement: {
        type: String,
        required: [true, 'Please provide job requirment'],
        maxlength:500
    },
    type: {
        type: String,
        required: [true, 'Please provide type'],
        enum:['Part-time','Full-time', 'Remote', 'Internship', 'Freelance'],
        default:'Full-time'
    },
    status:{
        type:String,
        enum:['Interview','Declined','Pending'],
        default:'Pending'
    },
    vacancy: {
        type: Number,
        required: [true, 'Please provide vacancy'],
    },
    exprience: {
        type: Number,
        required: [true, 'Please provide exprience'],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
}, { timestamps: true});

module.exports = mongoose.model('Job',JobSchema);