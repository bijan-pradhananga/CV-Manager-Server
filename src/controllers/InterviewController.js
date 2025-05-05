const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');

const scheduleInterview = async (req, res) => {
  try {
    const { candidateId, interviewerId, interviewDate, interviewTime, stage } = req.body;
    
    // Convert 24-hour time to 12-hour AM/PM format
    const [hours, minutes] = interviewTime.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    const formattedTime = `${hour}:${minutes} ${ampm}`;

    const interview = new Interview({
      candidate: candidateId,
      interviewer: interviewerId,
      stage:stage,
      interviewDate,
      interviewTime: formattedTime, // Store the formatted time
    });

    await interview.save();

    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { interviewSchedules: interview._id }
    });

    res.status(201).json({ message: "Interview Scheduled" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInterviewsByCandidate = async (req, res) => {
  try {
      const candidateId = req.params.candidateId;

      // Find interviews and populate both candidate and interviewer details
      const interviews = await Interview.find({ candidate: candidateId })
          .populate('candidate', 'name email') // Only get name and email of candidate
          .populate('interviewer', 'name email') // Only get name and email of interviewer
          .sort({ createdAt:-1 }); // Sort by date and time

      if (!interviews || interviews.length === 0) {
          return res.status(404).json({ 
              message: 'No interviews found for this candidate',
              candidateId: candidateId
          });
      }

      // Format the response data
      const formattedInterviews = interviews.map(interview => ({
          id: interview._id,
          stage: interview.stage,
          candidate: interview.candidate,
          interviewer: interview.interviewer,
          date: interview.interviewDate.toISOString().split('T')[0], // YYYY-MM-DD format
          time: interview.interviewTime,
          reminderSent: interview.reminderSent,
          createdAt: interview.createdAt
      }));

      res.status(200).json({
          count: interviews.length,
          interviews: formattedInterviews
      });

  } catch (error) {
      res.status(500).json({ 
          message: 'Error fetching interviews',
          error: error.message 
      });
  }
};


module.exports = {
  scheduleInterview, getInterviewsByCandidate
};
