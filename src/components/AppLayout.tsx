import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchQuestions } from "../features/questions/questionsSlice";
import Navigation from "./Navigation";
import ProtectedRoute from "./ProtectedRoute";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
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
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
