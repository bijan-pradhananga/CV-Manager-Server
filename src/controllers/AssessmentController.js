const Assessment = require('../models/Assessment');
const Candidate = require('../models/Candidate');

const uploadAssessment = async (req, res) => {
  try {
    const { candidateId, assessmentType, remarks, evaluation } = req.body;
    const testFileUrl = req.file ? req.file.path : null;

    const assessment = new Assessment({
      candidate: candidateId,
      assessmentType,
      remarks,
      testFileUrl,
      evaluation
    });

    await assessment.save();

    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { assessments: assessment._id }
    });

    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAssessmentByCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const assessments = await Assessment.find({ candidate: candidateId });

    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadAssessment,
  getAssessmentByCandidate
};
