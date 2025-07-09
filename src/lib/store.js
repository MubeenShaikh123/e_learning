import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer, { initialUserState } from './features/user/userSlice';
import courseReducer, { initialCourseState } from './features/course/courseSlice';
import quizReducer, { initialQuizState } from './features/quiz/quizSlice';

const appReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  quiz: quizReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {
      user: initialUserState,
      course: initialCourseState,
      quiz: initialQuizState
    };
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
