import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../utils/_DATA";

const initialState = {
  questions: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const questions = await _getQuestions();
    return questions;
  }
);

export const saveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async (questionData) => {
    const question = await _saveQuestion(questionData);
    return question;
  }
);

export const saveQuestionAnswer = createAsyncThunk(
  "questions/saveQuestionAnswer",
  async (answerData) => {
    await _saveQuestionAnswer(answerData);
    return answerData;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch questions";
      })
      // Save question
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.questions[action.payload.id] = action.payload;
      })
      // Save question answer
      .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
        const { qid, answer, authedUser } = action.payload;
        if (state.questions[qid]) {
          state.questions[qid][answer].votes.push(authedUser);
        }
      });
  },
});

export default questionsSlice.reducer;
