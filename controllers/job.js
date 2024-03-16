const { NotFoundError, BadRequestError } = require('../errors');
const JobSchema = require('../dbmodels/jobs');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
    const {userId, role } = req.user;
    let query = {}
    if(role == 'creator')
        query = { createdBy: userId }

    const jobs = await JobSchema.find(query).sort('createdAt'); //createdBy: req.user.userId
    res.status(StatusCodes.OK).json({ jobs });
}

const getJob = async (req, res) => {
    const {userId, role } = req.user
    const jobId = req.params.id;
    let query = { _id: jobId}
    if (role == 'creator'){
        query = {
            _id: jobId,
            createdBy: userId
        }
    }
    
    const job = await JobSchema.findOne(query)

    if (!job)
        throw new NotFoundError(`No job with id ${jobId}`);

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await JobSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
    const userId = req.user.userId;
    const jobId = req.params.id;
    const body = req.body;
    if (!(body.company && body.position)) {
        throw new BadRequestError('Please provide company and postion');
    }

    const job = await JobSchema.findByIdAndUpdate({
        _id: jobId,
        createdBy: userId
    }, body, { new: true, runValidators: true })

    if (!job)
        throw new NotFoundError(`No job with id ${jobId}`);

    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const userId = req.user.userId;
    const jobId = req.params.id;
    const job = await JobSchema.findByIdAndDelete({
        _id: jobId,
        createdBy: userId
    })

    if (!job)
        throw new NotFoundError(`No job with id ${jobId}`);

    res.status(StatusCodes.OK).json({msg:"Deleted successfully"});
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}