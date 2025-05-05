const { deleteCandidateFiles } = require('../helper/fileHelper');
const Candidate = require('../models/Candidate');
const Interview = require('../models/Interview');
const Assessment = require('../models/Assessment');
const sendMail = require('../helper/sendMail');
const { getHiringEmail, getRejectionEmail } = require('../utils/emailTemplates');

const createCandidate = async (req, res) => {
  try {
    const { name, phone, email, references, technology, level, salaryExpectation, experience } = req.body;
    const cvFileUrl = req.file ? req.file.path : null;

    const candidate = new Candidate({
      name, phone, email, references, technology, level, salaryExpectation, experience, cvFileUrl
    });

    await candidate.save();
    res.status(201).json({ message: "Candidate Added Successfully" });
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
    res.status(200).json({ candidates });
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

const updateCandidate = async function (req, res) {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Delete old file if new file is being uploaded
    if (req.file && candidate.cvFileUrl) {
      deleteCandidateFiles(candidate);
    }

    const updatedData = req.file
      ? Object.assign({}, req.body, { cvFileUrl: req.file.path })
      : req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );


    // Send email only if interviewStatus is updated
    if (updatedData.interviewStatus) {
      const candidateName = updatedCandidate.name;
      const recipient = updatedCandidate.email;

      if (updatedData.interviewStatus === 'Hired') {
        const { subject, html } = getHiringEmail(candidateName);
        await sendMail({ to: recipient, subject, html });
      } else if (updatedData.interviewStatus === 'Rejected') {
        const { subject, html } = getRejectionEmail(candidateName);
        await sendMail({ to: recipient, subject, html });
      }
    }
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCandidate = async function (req, res) {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // First delete all interviews and assessmetns associated with this candidate
    await Interview.deleteMany({ candidate: req.params.id });
    await Assessment.deleteMany({ candidate: req.params.id });

    // Then delete candidate files and the candidate itself
    deleteCandidateFiles(candidate);
    await Candidate.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Candidate and associated interviews deleted successfully' });
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
