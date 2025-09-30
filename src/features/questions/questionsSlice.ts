import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../utils/_DATA';
import type { Question } from '../../utils/_DATA';

export interface QuestionsState {
  questions: Record<string, Question>;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const questions = await _getQuestions();
  return questions;
});

export const saveQuestion = createAsyncThunk(
  'questions/saveQuestion',
  async (questionData: { optionOneText: string; optionTwoText: string; author: string }) => {
    const question = await _saveQuestion(questionData);
    return question;
  }
);

export const saveQuestionAnswer = createAsyncThunk(
  'questions/saveQuestionAnswer',
  async (answerData: { authedUser: string; qid: string; answer: 'optionOne' | 'optionTwo' }) => {
    await _saveQuestionAnswer(answerData);
    return answerData;
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Record<string, Question>>) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch questions';
      })
      // Save question
      .addCase(saveQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
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