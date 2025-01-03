const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: 
       { 
          type: String, 
          required: true 
       },
  //  description: 
  //      { 
  //        type: String, 
  //        required: true 
  //      },
   fields: [
    {
        label:
        { 
            type: String, 
            required: true 
        },
      type: 
      { 
        type: String, 
        required: true 
      },
      required: 
          { 
            type: Boolean, 
            default: false 
           },
      options: [String],
      content: { type: String }, // to add bubble content
      errorMessage: { type: String, default: '' }
    },
  ],
  background: { type: String,default:null },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default:null },
  isPublic: { type: Boolean, default: false },
  shareableLink: { type: String, unique: true, sparse: true },
}, { timestamps: true }
);

module.exports = mongoose.model('Form', formSchema);

// const mongoose = require('mongoose');

// const fieldSchema = new mongoose.Schema({
//   label: { type: String, required: true },
//   type: { type: String, required: true }, // 'bubble' or 'input'
//   subtype: { type: String, required: true }, // e.g., 'Text', 'Image' for bubbles; 'TextInput', 'NumberInput' for inputs
//   required: { type: Boolean, default: false },
//   options: [String],
//   errorMessage: { type: String, default: '' },
//   content: { type: String, default: '' }, // content for bubble types (e.g., text, image URL)
//   value: { type: String, default: '' } // value for input types
// });

// const formSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   fields: [fieldSchema],
//   background: { type: String, required: true },
//   workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
//   isPublic: { type: Boolean, default: false },
//   shareableLink: { type: String, unique: true, sparse: true }
// }, { timestamps: true });

// const Form = mongoose.model('Form', formSchema);

// module.exports = Form;
