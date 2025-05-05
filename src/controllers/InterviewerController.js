const Interviewer = require('../models/Interviewer');

const createInterviewer = async (req, res) => {
  try {
    const { name, email } = req.body;

    const interviewer = new Interviewer({
      name, email
    });

    await interviewer.save();

    res.status(201).json({message:"Interviewer Added Successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllInterviewers = async (req, res) => {
  try {
    const interviewers = await Interviewer.find().sort({ createdAt: -1 });

    res.status(200).json({interviewers});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInterviewerById = async (req, res) => {
  try {
    const interviewer = await Interviewer.findById(req.params.id);

    if (!interviewer) {
      return res.status(404).json({ message: 'Interviewer not found' });
    }

    res.status(200).json(interviewer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInterviewer = async (req, res) => {
  try {
    const { name , email} = req.body;

    const updatedInterviewer = await Interviewer.findByIdAndUpdate(
      req.params.id,
      { name , email},
      { new: true }
    );

    if (!updatedInterviewer) {
      return res.status(404).json({ message: 'Interviewer not found' });
    }

    res.status(200).json({message:"Interviewer Updated Successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInterviewer = async (req, res) => {
  try {
    const deletedInterviewer = await Interviewer.findByIdAndDelete(req.params.id);

    if (!deletedInterviewer) {
      return res.status(404).json({ message: 'Interviewer not found' });
    }

    res.status(200).json({ message: 'Interviewer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInterviewer,
  getAllInterviewers,
  getInterviewerById,
  updateInterviewer,
  deleteInterviewer
};