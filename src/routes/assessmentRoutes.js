const express = require('express');
const router = express.Router();
const upload = require('../middleware/UploadMiddleware');
const assessmentController = require('../controllers/AssessmentController');

// Upload assessment file and assign to candidate
router.post('/', upload('assessments').single('testFile'), assessmentController.uploadAssessment);

// Get candidate assessments
router.get('/candidate/:candidateId', assessmentController.getAssessmentByCandidate);

module.exports = router;
