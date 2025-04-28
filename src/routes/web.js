const express = require('express');
const router = express.Router();

// Import route files
const candidateRoutes = require('./candidateRoutes');
const assessmentRoutes = require('./assessmentRoutes');
const offerRoutes = require('./offerLetterRoutes');
const interviewRoutes = require('./interviewRoutes');

router.use('/candidates', candidateRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/offers', offerRoutes);
router.use('/interviews', interviewRoutes);

module.exports = router;
