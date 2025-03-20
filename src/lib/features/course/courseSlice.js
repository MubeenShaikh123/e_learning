import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    details: {},
    isEnrolled: false
  },
  reducers: {
    setCourseDetails(state, action) {
      state.details = action.payload;
    },
    setEnrollmentStatus(state, action) {
      state.isEnrolled = action.payload;
    }
  }
});

export const { setCourseDetails, setEnrollmentStatus } = courseSlice.actions;
export default courseSlice.reducer;
