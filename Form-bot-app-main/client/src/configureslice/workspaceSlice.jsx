
import { createSlice } from '@reduxjs/toolkit';

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    folderId: null,
    fields: [],
    formDetails: {
      title: '',
      background: '',
    },
    theme:'',
    forms: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addField: (state, action) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action) => {
      const { id, updates } = action.payload;
      const fieldIndex = state.fields.findIndex(field => field.id === id);
      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = { ...state.fields[fieldIndex], ...updates };
      }
    },
    setFormDetails: (state, action) => {
      state.formDetails = { ...state.formDetails, ...action.payload };
    },
    updateWorkspaceFields: (state, action) => {
      state.fields = action.payload;
    },
    resetForm: (state) => {
      state.fields = [];
      state.formDetails = { title: ''};
    },
    setFolderId: (state, action) => {
      state.folderId = action.payload;
    },
    clearFolderId: (state) => {
      state.folderId = null;
    },
    deleteField: (state, action) => {
      const { id } = action.payload;
      state.fields = state.fields.filter((field) => field.id !== id);
    },
    setTheme: (state, action) => {
      state.theme= action.payload;
      state.formDetails.background = action.payload; // Set theme
    }
  },
});

export const { addField, updateField, setFormDetails, updateWorkspaceFields, resetForm, setFolderId, clearFolderId,deleteField ,setTheme} = workspaceSlice.actions;
export default workspaceSlice.reducer;





