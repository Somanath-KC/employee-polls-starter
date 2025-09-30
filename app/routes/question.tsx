import { useState } from "react";
import { useParams, Link } from "react-router";
import AppLayout from "../../src/components/AppLayout";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { saveQuestionAnswer } from "../../src/features/questions/questionsSlice";
import { addAnswerToUser } from "../../src/features/users/usersSlice";

export function meta() {
  return [
    { title: "Poll Details - Employee Polls" },
    { name: "description", content: "View and vote on poll" },
  ];
}

export default function Question() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState<
    "optionOne" | "optionTwo" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const questions = useAppSelector((state) => state.questions.questions);
  const users = useAppSelector((state) => state.users.users);

  const question = id ? questions[id] : null;

  if (!question) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Poll Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The poll you're looking for doesn't exist.
          </p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </AppLayout>
    );
  }
  const author = users[question.author];
  const hasAnswered =
    currentUser &&
    (question.optionOne.votes.includes(currentUser) ||
      question.optionTwo.votes.includes(currentUser));

  const userAnswer =
    hasAnswered && currentUser
      ? question.optionOne.votes.includes(currentUser)
        ? "optionOne"
        : "optionTwo"
      : null;

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage =
    totalVotes > 0
      ? Math.round((question.optionOne.votes.length / totalVotes) * 100)
      : 0;
  const optionTwoPercentage =
    totalVotes > 0
      ? Math.round((question.optionTwo.votes.length / totalVotes) * 100)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption || !currentUser || !id) return;

    setIsSubmitting(true);

    try {
      await dispatch(
        saveQuestionAnswer({
          authedUser: currentUser,
          qid: id,
          answer: selectedOption,
        })
      ).unwrap();

      dispatch(
        addAnswerToUser({
          userId: currentUser,
          questionId: id,
          answer: selectedOption,
        })
      );
    } catch (error) {
      console.error("Failed to save answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Author Info */}
          {author && (
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
              <img
                src={author.avatarURL}
                alt={author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {author.name} asks:
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(question.timestamp)}
                </p>
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Would You Rather...
          </h1>

          {hasAnswered ? (
            // Show results if user has already answered
            <div className="space-y-6">
              <div
                className={`p-4 rounded-lg border-2 ${
                  userAnswer === "optionOne"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Option A</h3>
                  {userAnswer === "optionOne" && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Your choice
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-3">{question.optionOne.text}</p>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${optionOnePercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {question.optionOne.votes.length} out of {totalVotes} votes (
                  {optionOnePercentage}%)
                </p>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  userAnswer === "optionTwo"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Option B</h3>
                  {userAnswer === "optionTwo" && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Your choice
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-3">{question.optionTwo.text}</p>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${optionTwoPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {question.optionTwo.votes.length} out of {totalVotes} votes (
                  {optionTwoPercentage}%)
                </p>
              </div>
            </div>
          ) : (
            // Show voting form if user hasn't answered
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="poll-option"
                    value="optionOne"
                    checked={selectedOption === "optionOne"}
                    onChange={(e) =>
                      setSelectedOption(e.target.value as "optionOne")
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Option A</div>
                    <div className="text-gray-700">
                      {question.optionOne.text}
                    </div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="poll-option"
                    value="optionTwo"
                    checked={selectedOption === "optionTwo"}
                    onChange={(e) =>
                      setSelectedOption(e.target.value as "optionTwo")
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Option B</div>
                    <div className="text-gray-700">
                      {question.optionTwo.text}
                    </div>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={!selectedOption || isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Vote"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
