import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {},
};

export const rapportSlice = createSlice({
 name: 'rapport',

  initialState,
 reducers: {
   addRapportToStore: (state, action) => {
     state.value = action.payload;
   },
   deleteRapportToStore : (state) => {
    state.value = {};
  },
 },
});

export const { addRapportToStore, deleteRapportToStore } = rapportSlice.actions;
export default rapportSlice.reducer;