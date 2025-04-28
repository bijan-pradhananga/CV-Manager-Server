// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    email: { type: String, required: true },
    references: String,
    technology: [String], // Array of techs: ['React', 'Node', 'DevOps']
    level: { type: String, enum: ['Junior', 'Mid', 'Senior'] },
    salaryExpectation: Number,
    experience: Number,
    cvFileUrl: String, // URL/path to uploaded CV
    interviewStatus: {
        type: String,
        enum: ['Shortlisted', 'First Interview Complete', 'Second Interview Complete', 'Hired', 'Rejected', 'Blacklisted'],
        default: 'Shortlisted'
    },
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    interviewSchedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
    offerLetter: { type: mongoose.Schema.Types.ObjectId, ref: 'OfferLetter' }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
