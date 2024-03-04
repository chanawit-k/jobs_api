const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ job })
}

const getJobs = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`Not found Item with ID ${jobId} `)
  }

  res.status(StatusCodes.OK).json({ job })
}

const createJobs = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const UpdateJobs = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError(`Company of Position fields Cannot be empty`)
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true }
  )

  res.status(StatusCodes.OK).json({ job })
}

const DeleteJobs = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove(
    { _id: jobId, createdBy: userId },
    { new: true }
  )

  if (!job) {
    throw new NotFoundError(`Not found Item with ID ${jobId} `)
  }

  res.status(StatusCodes.OK).send('Job was Deleted')
}

module.exports = {
  getAllJobs,
  getJobs,
  createJobs,
  UpdateJobs,
  DeleteJobs,
}
