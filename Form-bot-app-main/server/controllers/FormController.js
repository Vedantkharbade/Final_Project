const Form = require('../model/FormSchema');
const Folder = require('../model/FolderSchema');

const createForm = async (req, res) => {
  try {
    const { title, fields, background,folder } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: User information missing' });
    }

    const workspaceId = req.user.userId;
    console.log('User ID:', workspaceId);
    console.log('Folder ID:', folder);

    let folderExists = null;
    if (folder) {
      // Check if the folder exists and belongs to the user
      folderExists = await Folder.findOne({ _id: folder, workspaceId });
      console.log('Folder exists:', folderExists);

      if (!folderExists) {
        return res.status(400).json({ message: 'Invalid folder ID or folder does not belong to the user' });
      }
    }

    // Ensure each field has an error message
    // const fieldsWithErrors = fields.map(field => ({
    //   ...field,
    //   errorMessage: field.errorMessage || `Please enter a valid ${field.label.toLowerCase()}`
    // }));

    // Create a new form with the provided details
    const form = new Form({
      title,
      fields ,
      background: background || null,
      workspaceId,
      folder: folderExists ? folderExists._id : null,
    });

    // Save the form to the database
    await form.save();

    // If the form is associated with a folder, update the folder's forms array
    if (folderExists) {
      folderExists.forms.push(form._id);
      await folderExists.save();
    }

    // Respond with the created form
    res.status(201).json(form);
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

  const getForms = async (req, res) => {
    try {
      const forms = await Form.find({ workspaceId: req.user.userId });
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getForm = async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const updateForm = async (req, res) => {
    try {
      console.log(req.body)
      const form = await Form.findOneAndUpdate(
        { _id: req.params.id, workspaceId: req.user.userId },
        req.body,
        { new: true }
      );
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const deleteForm = async (req, res) => {
    try {
      console.log('Request Params:', req.params);
      console.log('User ID:', req.user.userId);
      
      const form = await Form.findOneAndDelete({ _id: req.params.id, workspaceId: req.user.userId });
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.json({ message: 'Form deleted' });
    } catch (error) {
      console.error('Error in deleteForm:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  const getAllFormsDetailed = async (req, res) => {
    try {
      const forms = await Form.find({ workspaceId: req.user.userId })
        .populate('folder', 'name')
        .sort({ createdAt: -1 });
  
      const detailedForms = forms.map(form => ({
        id: form._id,
        title: form.title,
        description: form.description,
        fields: form.fields,
        background: form.background,
        folder: form.folder ? { id: form.folder._id, name: form.folder.name } : null,
        createdAt: form.createdAt
      }));
  
      res.json(detailedForms);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Export the function if needed
   module.exports = { createForm, getForms,getForm,deleteForm,updateForm,getAllFormsDetailed};
  