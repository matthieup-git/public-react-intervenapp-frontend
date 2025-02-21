import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {},
};

export const usersSlice = createSlice({
 name: 'users',

  initialState,
 reducers: {
   addUserToStore: (state, action) => {
     state.value = action.payload;
   },
   deleteUserToStore : (state) => {
    state.value = {};
  },
 },
});

export const { addUserToStore, deleteUserToStore } = usersSlice.actions;
export default usersSlice.reducer;