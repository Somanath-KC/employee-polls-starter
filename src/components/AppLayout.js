import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchQuestions } from "../features/questions/questionsSlice";
import Navigation from "./Navigation";
import ProtectedRoute from "./ProtectedRoute";

export default function AppLayout({ children }) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const usersLoading = useAppSelector((state) => state.users.loading);
  const questionsLoading = useAppSelector((state) => state.questions.loading);

  // Load initial data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUsers());
      dispatch(fetchQuestions());
    }
  }, [dispatch, isAuthenticated]);

  const isLoading = usersLoading || questionsLoading;

  return (
    <ProtectedRoute>
      <div className="container">
        <Navigation />

        <main>
          {isLoading ? (
            <div className="loading">
              <p>Loading...</p>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
