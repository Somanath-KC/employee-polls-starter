import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { _getUsers } from '../../utils/_DATA';
import type { User } from '../../utils/_DATA';

export interface UsersState {
  users: Record<string, User>;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: {},
  loading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await _getUsers();
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addAnswerToUser: (state, action: PayloadAction<{ userId: string; questionId: string; answer: 'optionOne' | 'optionTwo' }>) => {
      const { userId, questionId, answer } = action.payload;
      if (state.users[userId]) {
        state.users[userId].answers[questionId] = answer;
      }
    },
    addQuestionToUser: (state, action: PayloadAction<{ userId: string; questionId: string }>) => {
      const { userId, questionId } = action.payload;
      if (state.users[userId]) {
        state.users[userId].questions.push(questionId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Record<string, User>>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { addAnswerToUser, addQuestionToUser } = usersSlice.actions;
export default usersSlice.reducer;