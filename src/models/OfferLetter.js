// models/OfferLetter.js
const mongoose = require('mongoose');

const offerLetterSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  offerContent: String, 
  templateUsed: String 
}, { timestamps: true });

module.exports = mongoose.model('OfferLetter', offerLetterSchema);
