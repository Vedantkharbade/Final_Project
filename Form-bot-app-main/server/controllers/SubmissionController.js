// const Submission = require('../model/Submission');
// const Form = require('../model/FormSchema');


// const saveSubmission = async (req, res) => {
//   const { sessionId, shareableLink, userResponses } = req.body;
//   const response = new Submission({ sessionId, shareableLink, userResponses });
//   await response.save();
//   res.send(response);
// };

// const getSubmission = async (req, res) => {
//   const response = await Submission.findOne({ sessionId: req.params.sessionId });
//   if (response) {
//     res.send(response);
//   } else {
//     res.status(404).send({ message: 'Response not found' });
//   }
// };
// const getFormAnalytics = async (req, res) => {
//   try {
//     const { shareableLink } = req.params;

//     const totalViews = await Submission.countDocuments({ shareableLink });
//     const totalStarts = await Submission.countDocuments({ shareableLink, userResponses: { $exists: true, $ne: [] } });
//     const totalCompletions = await Submission.countDocuments({ shareableLink, 'userResponses.4': { $exists: true } }); // Assuming 5 responses indicate completion
//     const completionRate = totalViews ? (totalCompletions / totalViews) * 100 : 0;

//     const submissions = await Submission.find({ shareableLink });

//     res.json({
//       totalViews,
//       totalStarts,
//       totalCompletions,
//       completionRate,
//       submissions,
//     });
//   } catch (error) {
//     console.error('Error getting analytics:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = { saveSubmission,getSubmission, getFormAnalytics };


const Submission = require('../model/Submission');
const { v4: uuidv4 } = require('uuid');

const incrementViewCount = async (req, res) => {
  try {
    const { sessionId, shareableLink } = req.body;
    console.log(req.body)

    // Ensure sessionId and shareableLink are provided
    if (!sessionId || !shareableLink) {
      return res.status(400).json({ message: 'Session ID and shareable link are required' });
    }

    // Check if a submission already exists for the session
    const existingSubmission = await Submission.findOne({ sessionId, shareableLink });

    if (!existingSubmission) {
      // Create a new submission entry to increment view count
      const newView = new Submission({ sessionId, shareableLink, userResponses: [] });
      await newView.save();
    }

    res.status(200).send({ message: 'View count incremented' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const saveSubmission = async (req, res) => {
  const { sessionId, shareableLink, userResponses } = req.body;
  const response = await Submission.findOneAndUpdate(
    { sessionId, shareableLink },
    { userResponses },
    { upsert: true, new: true }
  );
  res.send(response);
};

const completeSubmission = async (req, res) => {
  try {
    const { sessionId, shareableLink } = req.body;
    await Submission.findOneAndUpdate(
      { sessionId, shareableLink },
      { completedAt: new Date() }
    );
    res.status(200).send({ message: 'Submission marked as complete' });
  } catch (error) {
    console.error('Error marking submission as complete:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getFormAnalytics = async (req, res) => {
  try {
    const { shareableLink } = req.params;

    const totalViews = await Submission.countDocuments({ shareableLink });
    const totalStarts = await Submission.countDocuments({ shareableLink, userResponses: { $exists: true, $ne: [] } });
    const totalCompletions = await Submission.countDocuments({ shareableLink, completedAt: { $exists: true } });
    const completionRate = totalViews ? (totalCompletions / totalViews) * 100 : 0;

    const submissions = await Submission.find({ shareableLink });

    res.json({
      totalViews,
      totalStarts,
      totalCompletions,
      completionRate,
      submissions,
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { incrementViewCount, saveSubmission, completeSubmission, getFormAnalytics };



