import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./components/LoginPage";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import AddPoll from "./pages/AddPoll";
import Question from "./pages/Question";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <AppLayout>
              <Leaderboard />
            </AppLayout>
          }
        />
        <Route
          path="/add"
          element={
            <AppLayout>
              <AddPoll />
            </AppLayout>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <AppLayout>
              <Question />
            </AppLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
