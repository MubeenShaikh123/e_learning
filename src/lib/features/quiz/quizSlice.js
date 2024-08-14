// lib/features/quiz/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quiz: {
    title: '',
    questions: [],
  },
  currentQuestionIndex: 0,
  answers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
      console.log("quizzSlice setquiz", action.payload)
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.quiz.questions.length - 1) {
        console.log("quizzSlice nextq")
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        console.log("quizzSlice prevq")
        state.currentQuestionIndex -= 1;
      }
    },
    saveAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = {answer};
    },
    setQuestionIndex: (state, action) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.quiz.questions.length) {
        console.log("quizSlice setQuestionIndex", index);
        state.currentQuestionIndex = index;
      }
    },
  },
});

export const { setQuiz, nextQuestion, prevQuestion, saveAnswer, setQuestionIndex } = quizSlice.actions;

export default quizSlice.reducer;
