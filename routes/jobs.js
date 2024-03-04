const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJobs,
  createJobs,
  UpdateJobs,
  DeleteJobs,
} = require('../controllers/jobs')

router.route('/').post(createJobs).get(getAllJobs)
router.route('/:id').get(getJobs).delete(DeleteJobs).patch(UpdateJobs)

module.exports = router
