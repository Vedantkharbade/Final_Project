const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the UUID library
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId, // Using mongoose.ObjectId for user reference
    ref: 'User', 
  },
  parentFolderId: {
    type: String, // Changed to String to store UUID
    default: null,
  },
  forms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
  }]
}, 
{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
); // Enable timestamps

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;


