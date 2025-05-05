// models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Interviewer', required: true },
    stage: String,
    interviewDate: Date,
    interviewTime: String,
    reminderSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
