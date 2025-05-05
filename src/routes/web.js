const express = require('express');
const router = express.Router();

// Import route files
const candidateRoutes = require('./candidateRoutes');
const assessmentRoutes = require('./assessmentRoutes');
const offerRoutes = require('./offerLetterRoutes');
const interviewRoutes = require('./interviewRoutes');
const interviewerRoutes = require('./interviewerRoutes');

router.use('/candidates', candidateRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/offers', offerRoutes);
router.use('/interviews', interviewRoutes);
router.use('/interviewer', interviewerRoutes);

module.exports = router;
