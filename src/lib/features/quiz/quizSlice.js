// lib/features/quiz/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

export const initialQuizState = {
  quiz: {
    title: '',
    questions: [],
  },
  currentQuestionIndex: 0,
  answers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState: initialQuizState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
      state.answers = new Array(action.payload.questions.length);
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.quiz.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    saveAnswer: (state, action) => {
      const { index, questionId, answer } = action.payload;
      state.answers[index] = answer
      for (let i = 0; i < state.answers.length; i++) {
        console.log(` ${i} : `, state.answers[i]);
      }
    },
    setQuestionIndex: (state, action) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.quiz.questions.length) {
        state.currentQuestionIndex = index;
      }
    },
  },
},
);

export const { setQuiz, nextQuestion, prevQuestion, saveAnswer, setQuestionIndex } = quizSlice.actions;

export default quizSlice.reducer;
