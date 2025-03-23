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
    deleteRapportToStore: (state) => {
      state.value = {};
    },
    updateStatusIsDoneToStore: (state, action) => {
      state.value.states.isDone = action.payload
    },
    updateReportInStore: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { addRapportToStore, deleteRapportToStore, updateStatusIsDoneToStore, updateReportInStore } = rapportSlice.actions;
export default rapportSlice.reducer;