import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import usersReducer from "../../features/users/usersSlice";
import questionsReducer from "../../features/questions/questionsSlice";
import PollCard from "../PollCard";

const mockQuestion = {
  id: "test-question",
  author: "testuser",
  timestamp: 1609459200000, // Jan 1, 2021
  optionOne: {
    votes: ["user1"],
    text: "Option One Text",
  },
  optionTwo: {
    votes: ["user2", "user3"],
    text: "Option Two Text",
  },
};

const mockUsers = {
  testuser: {
    id: "testuser",
    name: "Test User",
    avatarURL: "https://example.com/avatar.jpg",
    answers: {},
    questions: ["test-question"],
    password: "password",
  },
};

const createMockStore = (authUser: string | null = null) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      auth: {
        user: authUser,
        isAuthenticated: !!authUser,
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

// Test 5: Snapshot test for PollCard component
test("PollCard component renders correctly", () => {
  const store = createMockStore("testuser");

  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <PollCard question={mockQuestion} />
      </Provider>
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});
