import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import usersReducer from "../../features/users/usersSlice";
import questionsReducer from "../../features/questions/questionsSlice";
import Navigation from "../Navigation";

const mockUsers = {
  testuser: {
    id: "testuser",
    name: "Test User",
    avatarURL: "https://example.com/avatar.jpg",
    answers: {},
    questions: [],
    password: "password123",
  },
};

const createMockStore = (isAuthenticated = true, user = "testuser") => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      auth: {
        user: isAuthenticated ? user : null,
        isAuthenticated,
      },
      users: {
        users: mockUsers,
        loading: false,
        error: null,
      },
      questions: {
        questions: {},
        loading: false,
        error: null,
      },
    },
  });
};

// Test 12: Navigation displays all expected links when authenticated
test("navigation bar displays all expected links for authenticated user", () => {
  const store = createMockStore(true);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Employee Polls")).toBeDefined();
  expect(screen.getByText("Home")).toBeDefined();
  expect(screen.getByText("Leaderboard")).toBeDefined();
  expect(screen.getByText("New Poll")).toBeDefined();
  expect(screen.getByText("Logout")).toBeDefined();
  expect(screen.getByText("Test User")).toBeDefined();
});
