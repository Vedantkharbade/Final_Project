const Form = require('../model/FormSchema');
const crypto = require('crypto');

const shareForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findOne({ _id: formId, workspaceId: req.user.userId });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (!form.isPublic) {
      form.isPublic = true;
      form.shareableLink = crypto.randomBytes(10).toString('hex');
      await form.save();
    }

    res.json({ shareableLink: `${req.protocol}://${req.get('host')}/forms/public/${form.shareableLink}` });
  } catch (error) {
    console.error('Error sharing form:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPublicForm = async (req, res) => {
  try {
    const shareableLink = req.params.shareableLink;
    const form = await Form.findOne({ shareableLink, isPublic: true });

    if (!form) {
      return res.status(404).json({ message: 'Form not found or not public' });
    }

    res.status(201).json({
      formId: form._id,
      title: form.title,
      description: form.description,
      fields: form.fields,
      background: form.background
    });
  } catch (error) {
    console.error('Error getting public form:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { shareForm, getPublicForm };
