import { useState } from "react";
import AppLayout from "../../src/components/AppLayout";
import PollCard from "../../src/components/PollCard";
import { useAppSelector } from "../../src/store/hooks";

export function meta() {
  return [
    { title: "Home - Employee Polls" },
    { name: "description", content: "View answered and unanswered polls" },
  ];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"unanswered" | "answered">(
    "unanswered"
  );

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
    <AppLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Employee Polls</h1>
          <p className="mt-2 text-gray-600">
            Share your opinions and see what your colleagues think
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 justify-center">
            <button
              onClick={() => setActiveTab("unanswered")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "unanswered"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Unanswered Polls ({unansweredQuestions.length})
            </button>
            <button
              onClick={() => setActiveTab("answered")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "answered"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Answered Polls ({answeredQuestions.length})
            </button>
          </nav>
        </div>

        {/* Poll Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedQuestions.length > 0 ? (
            displayedQuestions.map((question) => (
              <PollCard key={question.id} question={question} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No {activeTab} polls
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "unanswered"
                  ? "Great job! You've answered all available polls."
                  : "Start participating by answering some polls!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
