const OfferLetter = require('../models/OfferLetter');
const Candidate = require('../models/Candidate');

const generateOfferLetter = async (req, res) => {
  try {
    const { candidateId, offerContent, templateUsed } = req.body;

    const offerLetter = new OfferLetter({
      candidate: candidateId,
      offerContent,
      templateUsed
    });

    await offerLetter.save();

    await Candidate.findByIdAndUpdate(candidateId, {
      offerLetter: offerLetter._id
    });

    res.status(201).json(offerLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  generateOfferLetter
};
