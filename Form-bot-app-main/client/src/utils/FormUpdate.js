import axios from 'axios';
import { setFormDetails } from '../configureslice/workspaceSlice';
import { getForm, getFormData } from '../api/formService';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const handleUpdate = async (formDetails, fields, folderId, setFormId, formId, dispatch) => {
  try {
    const config = getConfig();
    console.log(formDetails)
    console.log(formId)
    if(formDetails._id){
      const response = await axios.put(`${API_URL}/${formDetails._id}`, {
        title: formDetails.title,
        fields,
        background: formDetails.background,
        folder: folderId,
      }, config);
  
      setFormId(response.data._id);
      dispatch(setFormDetails(response.data));
    }else{
      const response_form = await axios.put(`${API_URL}/${formId}`, {
        title: formDetails.title,
        fields,
        background: formDetails.background,
        folder: folderId,
      }, config);
      console.log(response_form)
      setFormId(response_form.data.formId);
      dispatch(setFormDetails(response_form.data));
    }
  } catch (error) {
    console.error('Error saving form:', error);
  }
};

