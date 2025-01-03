const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  shareableLink: { type: String, required: true },
  userResponses: [
    {
      label: { type: String},
      response: { type: String}
    }
  ],
  completedAt: { type: Date } 
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);


