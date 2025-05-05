const express = require('express');
const router = express.Router();
const interviewerController = require('../controllers/InterviewerController');

// Create an interviewer
router.post('/', interviewerController.createInterviewer);

// Get all interviewers
router.get('/', interviewerController.getAllInterviewers);

// Get a single interviewer
router.get('/:id', interviewerController.getInterviewerById);

// Update an interviewer
router.put('/:id', interviewerController.updateInterviewer);

// Delete an interviewer
router.delete('/:id', interviewerController.deleteInterviewer);

module.exports = router;