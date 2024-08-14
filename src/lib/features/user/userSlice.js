import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    // Add other user-related state
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    // Add other user-related reducers
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
