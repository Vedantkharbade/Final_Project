import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    isAuthenticated: false,
    currentUser: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setIsAuthenticated(state, action) {
        state.isAuthenticated = action.payload;
      },
      setCurrentUser(state, action) {
        console.log(action.payload);
        state.currentUser = action.payload;
      },
    },
  });
  
  export const {
    setIsAuthenticated,
    setCurrentUser,
  } = authSlice.actions;
  export default authSlice.reducer;