const express = require('express');
const router = express.Router();
const upload = require('../middleware/UploadMiddleware');
const offerController = require('../controllers/OfferLetterController');

// Generate Offer Letter 
router.post('/generate/:candidateId', offerController.generateOfferLetter);

module.exports = router;
