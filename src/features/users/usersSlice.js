import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../utils/_DATA";

const initialState = {
  users: {},
  loading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const users = await _getUsers();
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addAnswerToUser: (state, action) => {
      const { userId, questionId, answer } = action.payload;
      if (state.users[userId]) {
        state.users[userId].answers[questionId] = answer;
      }
    },
    addQuestionToUser: (state, action) => {
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
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { addAnswerToUser, addQuestionToUser } = usersSlice.actions;
export default usersSlice.reducer;
