const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/InterviewController');

// Schedule an interview
router.post('/schedule', interviewController.scheduleInterview);

// Get interview details for a candidate
router.get('/candidate/:candidateId', interviewController.getInterviewsByCandidate);

// // Update interview status 
// router.put('/updateStatus/:interviewId', interviewController.updateInterviewStatus);

module.exports = router;
