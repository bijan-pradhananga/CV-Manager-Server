// models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  assessmentType: String, // Behavioral, Technical, etc.
  remarks: String,
  testFileUrl: String, // Uploaded test file
  evaluation: String
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
