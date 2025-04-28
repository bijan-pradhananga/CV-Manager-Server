const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');

const scheduleInterview = async (req, res) => {
  try {
    const { candidateId, interviewDate, interviewTime, interviewerName } = req.body;

    const interview = new Interview({
      candidate: candidateId,
      interviewDate,
      interviewTime,
      interviewerName
    });

    await interview.save();

    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { interviewSchedules: interview._id }
    });

    res.status(201).json(interview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  scheduleInterview
};
