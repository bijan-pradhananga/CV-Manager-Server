const Candidate = require('../models/Candidate');

const createCandidate = async (req, res) => {
  try {
    const { name, phone, email, references, technology, level, salaryExpectation, experience } = req.body;
    const cvFileUrl = req.file ? req.file.path : null;

    const candidate = new Candidate({
      name, phone, email, references, technology, level, salaryExpectation, experience, cvFileUrl
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const { search } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { technology: { $regex: search, $options: 'i' } },
        { interviewStatus: { $regex: search, $options: 'i' } }
      ];
    }

    const candidates = await Candidate.find(query).sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .populate('assessments')
      .populate('interviewSchedules')
      .populate('offerLetter');

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
};
