import { createSlice } from '@reduxjs/toolkit';

export const initialCourseState = {
  details: {},
  isEnrolled: false,
};

const courseSlice = createSlice({
  name: 'course',
  initialState:initialCourseState,
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
