import { createSlice } from '@reduxjs/toolkit';

export const initialUserState = {
  name: '',
  email: '',
  image: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.id = action.payload.id;
    },
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
