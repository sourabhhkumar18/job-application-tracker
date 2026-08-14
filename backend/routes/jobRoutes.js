import express from 'express';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect middleware to all routes
router.route('/').get(protect, getJobs).post(protect, createJob);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

export default router;