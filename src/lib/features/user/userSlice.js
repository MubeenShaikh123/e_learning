import { createSlice } from '@reduxjs/toolkit';

export const initialUserState = {
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
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
