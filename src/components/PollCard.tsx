import { Link } from "react-router";
import { useAppSelector } from "../store/hooks";
import type { Question } from "../utils/_DATA";

interface PollCardProps {
  question: Question;
}

export default function PollCard({ question }: PollCardProps) {
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.auth.user);

  const author = users[question.author];
  const hasAnswered =
    (currentUser && question.optionOne.votes.includes(currentUser)) ||
    (currentUser && question.optionTwo.votes.includes(currentUser));

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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        {author && (
          <>
            <img
              src={author.avatarURL}
              alt={author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">{author.name}</p>
              <p className="text-sm text-gray-500">
                {formatDate(question.timestamp)}
              </p>
            </div>
          </>
        )}
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-3">
        Would You Rather...
      </h3>

      <div className="space-y-2 mb-4">
        <p className="text-gray-600 truncate">
          <span className="font-medium">A:</span> {question.optionOne.text}
        </p>
        <p className="text-gray-600 truncate">
          <span className="font-medium">B:</span> {question.optionTwo.text}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            hasAnswered
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {hasAnswered ? "Answered" : "Not Answered"}
        </span>

        <Link
          to={`/questions/${question.id}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          View Poll
        </Link>
      </div>
    </div>
  );
}
