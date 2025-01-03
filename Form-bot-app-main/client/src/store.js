import { configureStore } from "@reduxjs/toolkit";
import authReducer from './configureslice/reduxSlice';
import workspaceReducer from './configureslice/workspaceSlice';
import formReducer from './configureslice/submissionSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      workspace: workspaceReducer,
      form: formReducer,
    },
  });
  
  export default store;