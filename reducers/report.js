import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const reportSlice = createSlice({
  name: 'report',

  initialState,
  reducers: {
    addReportToStore: (state, action) => {
      state.value = action.payload;
    },
    deleteReportToStore: (state) => {
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

export const { addReportToStore, deleteReportToStore, updateStatusIsDoneToStore, updateReportInStore } = reportSlice.actions;
export default reportSlice.reducer;