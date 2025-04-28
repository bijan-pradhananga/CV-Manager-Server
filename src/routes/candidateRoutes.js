const express = require('express');
const router = express.Router();
const upload = require('../middleware/UploadMiddleware');
const candidateController = require('../controllers/CandidateController');

// Create candidate with CV upload
router.post('/', upload('cvs').single('cvFile'), candidateController.createCandidate);

// Get all candidates
router.get('/', candidateController.getCandidates);

// Get a candidate by ID
router.get('/:id', candidateController.getCandidateById);

// Update a candidate
router.put('/:id', candidateController.updateCandidate);

// Delete a candidate
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
