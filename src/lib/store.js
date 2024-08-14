import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import courseReducer from './features/course/courseSlice';
import quizReducer from './features/quiz/quizSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      course: courseReducer,
      quiz: quizReducer
    }
  });
};
