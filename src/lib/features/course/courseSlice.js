import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    details: {},
    // Add other course-related state
  },
  reducers: {
    setCourseDetails(state, action) {
      state.details = action.payload;
    },
    // Add other course-related reducers
  }
});

export const { setCourseDetails } = courseSlice.actions;
export default courseSlice.reducer;
