import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import usersReducer from "../../features/users/usersSlice";
import questionsReducer from "../../features/questions/questionsSlice";
import LoginPage from "../LoginPage";

const mockUsers = {
  testuser: {
    id: "testuser",
    name: "Test User",
    avatarURL: "https://example.com/avatar.jpg",
    answers: {},
    questions: [],
    password: "password123",
  },
  anotheruser: {
    id: "anotheruser",
    name: "Another User",
    avatarURL: "https://example.com/avatar2.jpg",
    answers: {},
    questions: [],
    password: "secret456",
  },
};

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isAuthenticated: false,
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

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
}));

const renderLoginPage = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
};

// Test 6: Login page has required elements
test("login page has user name field, password field, and submit button", () => {
  renderLoginPage();

  expect(screen.getByLabelText(/select user/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

// Test 7: DOM interaction test - form submission with invalid credentials
test("user entering incorrect password sees error message", async () => {
  renderLoginPage();

  const userSelect = screen.getByLabelText(/select user/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  // Select a user
  fireEvent.change(userSelect, { target: { value: "testuser" } });

  // Enter wrong password
  fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

  // Submit form
  fireEvent.click(submitButton);

  // Check for error message
  await waitFor(() => {
    expect(screen.getByText(/invalid password/i)).toBeInTheDocument();
  });
});

// Test 8: DOM interaction test - successful login
test("user entering correct credentials successfully logs in", async () => {
  renderLoginPage();

  const userSelect = screen.getByLabelText(/select user/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  // Select a user
  fireEvent.change(userSelect, { target: { value: "testuser" } });

  // Enter correct password
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Submit form
  fireEvent.click(submitButton);

  // Wait for navigation to be called
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalled();
  });
});
