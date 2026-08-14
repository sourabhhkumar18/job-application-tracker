import Job from '../models/Job.js';

// @desc    Get all job applications for logged-in user
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new job application
// @route   POST /api/jobs
export const createJob = async (req, res) => {
  const { company, position, status, location, salary, appliedDate, notes } = req.body;

  try {
    if (!company || !position) {
      return res.status(400).json({ message: 'Company and Position are required' });
    }

    const job = new Job({
      user: req.user._id,
      company,
      position,
      status,
      location,
      salary,
      appliedDate,
      notes
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job application
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check that logged in user owns this job record
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job application
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check ownership
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.json({ message: 'Job application removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};