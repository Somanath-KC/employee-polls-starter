import { useState } from "react";
import PollCard from "../components/PollCard";
import { useAppSelector } from "../store/hooks";

export default function Home() {
  const [activeTab, setActiveTab] = useState("unanswered");

  const currentUser = useAppSelector((state) => state.auth.user);
  const questions = useAppSelector((state) => state.questions.questions);

  // Sort questions by timestamp (most recent first)
  const sortedQuestions = Object.values(questions).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  // Filter questions based on whether current user has answered them
  const answeredQuestions = sortedQuestions.filter((question) => {
    if (!currentUser) return false;
    return (
      question.optionOne.votes.includes(currentUser) ||
      question.optionTwo.votes.includes(currentUser)
    );
  });

  const unansweredQuestions = sortedQuestions.filter((question) => {
    if (!currentUser) return true;
    return (
      !question.optionOne.votes.includes(currentUser) &&
      !question.optionTwo.votes.includes(currentUser)
    );
  });

  const displayedQuestions =
    activeTab === "answered" ? answeredQuestions : unansweredQuestions;

  return (
    <div>
      <div className="text-center">
        <h1>Employee Polls</h1>
        <p>Share your opinions and see what your colleagues think</p>
      </div>

      {/* Tab Navigation */}
      <div className="tabs">
        <div
          onClick={() => setActiveTab("unanswered")}
          className={`tab ${activeTab === "unanswered" ? "active" : ""}`}
        >
          Unanswered Polls ({unansweredQuestions.length})
        </div>
        <div
          onClick={() => setActiveTab("answered")}
          className={`tab ${activeTab === "answered" ? "active" : ""}`}
        >
          Answered Polls ({answeredQuestions.length})
        </div>
      </div>

      {/* Poll Grid */}
      <div>
        {displayedQuestions.length > 0 ? (
          displayedQuestions.map((question) => (
            <PollCard key={question.id} question={question} />
          ))
        ) : (
          <div className="text-center">
            <h3>No {activeTab} polls</h3>
            <p>
              {activeTab === "unanswered"
                ? "Great job! You've answered all available polls."
                : "Start participating by answering some polls!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
