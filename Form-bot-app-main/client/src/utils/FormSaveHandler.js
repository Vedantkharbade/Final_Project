import { toast } from 'react-toastify';
import { saveFormToServer, shareFormToServer } from '../api/formService';

export const handleSave = async (formDetails, fields, folderId, setFormId, dispatch) => {
  try {
    const formData = { ...formDetails, fields, folder: folderId, isPublic: true };
    const response = await saveFormToServer(formData);
    const savedFormId = response.data._id;

    if (!savedFormId) {
      throw new Error('Form ID not found');
    }

    const formLink = `${window.location.origin}/forms/public/${savedFormId}`;
    console.log(`Form link: ${formLink}`);

    const shareResponse = await shareFormToServer({ _id: savedFormId });
    const shareableLink = shareResponse.data.shareableLink;

    if (!shareableLink) {
      throw new Error('Shareable link not found');
    }

    const formIdFromLink = shareableLink.split('/').pop();
    setFormId(formIdFromLink);

    // Show success toast
    toast.success('Form saved successfully!');
  } catch (error) {
    console.error('Error saving form:', error);
    toast.error('Error saving form:provide form name');
  }
};

