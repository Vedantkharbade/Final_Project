
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  sessions: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    createSession: (state) => {
      const sessionId = uuidv4();
      state.sessions[sessionId] = {
        formDetails: null,
        chatHistory: [],
        userResponses: [],
        completeStatus: false,
      };
      return { sessionId };
    },
    setFormDetails: (state, action) => {
      const { sessionId, formDetails } = action.payload;
      if (!state.sessions[sessionId]) {
        state.sessions[sessionId] = {
          formDetails: null,
          chatHistory: [],
          userResponses: [],
          completeStatus: false,
        };
      }
      state.sessions[sessionId].formDetails = formDetails;
    },
    addChatEntry: (state, action) => {
      const { sessionId, chatEntry } = action.payload;
      state.sessions[sessionId].chatHistory.push(chatEntry);
    },
    addUserResponse: (state, action) => {
      const { sessionId, userResponse } = action.payload;
      state.sessions[sessionId].userResponses.push(userResponse);
    },
    setCompleteStatus: (state, action) => {
      const { sessionId, completeStatus } = action.payload;
      state.sessions[sessionId].completeStatus = completeStatus;
    },
  },
});

export const {
  createSession,
  setFormDetails,
  addChatEntry,
  addUserResponse,
  setCompleteStatus,
} = formSlice.actions;

export default formSlice.reducer;




