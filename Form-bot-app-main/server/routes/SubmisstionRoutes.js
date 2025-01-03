const express = require('express');
const { getFormAnalytics, saveSubmission, incrementViewCount, completeSubmission } = require('../controllers/SubmissionController');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

router.post('/submissions', saveSubmission);
router.get('/analytics/:shareableLink', getFormAnalytics);
router.post('/views', incrementViewCount);
router.post('/submissions/complete', completeSubmission);


module.exports = router;

