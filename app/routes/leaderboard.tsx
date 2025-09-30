import AppLayout from "../../src/components/AppLayout";
import { useAppSelector } from "../../src/store/hooks";

export function meta() {
  return [
    { title: "Leaderboard - Employee Polls" },
    { name: "description", content: "View top contributors" },
  ];
}

interface UserStats {
  id: string;
  name: string;
  avatarURL: string;
  questionsAsked: number;
  questionsAnswered: number;
  totalScore: number;
}

export default function Leaderboard() {
  const users = useAppSelector((state) => state.users.users);

  // Calculate stats for each user
  const userStats: UserStats[] = Object.values(users).map((user) => {
    const questionsAsked = user.questions.length;
    const questionsAnswered = Object.keys(user.answers).length;
    const totalScore = questionsAsked + questionsAnswered;

    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      questionsAsked,
      questionsAnswered,
      totalScore,
    };
  });

  // Sort users by total score (descending)
  const sortedUsers = userStats.sort((a, b) => b.totalScore - a.totalScore);

  const getRankSuffix = (rank: number) => {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return "th";
    }

    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="mt-2 text-gray-600">
            Top contributors ranked by questions asked and answered
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Rankings</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {sortedUsers.map((user, index) => {
              const rank = index + 1;
              const isTopThree = rank <= 3;

              return (
                <div
                  key={user.id}
                  className={`px-6 py-4 ${isTopThree ? "bg-gradient-to-r from-yellow-50 to-yellow-100" : "hover:bg-gray-50"} transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          rank === 1
                            ? "bg-yellow-400 text-yellow-900"
                            : rank === 2
                              ? "bg-gray-300 text-gray-700"
                              : rank === 3
                                ? "bg-yellow-600 text-yellow-100"
                                : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rank}
                      </div>

                      {/* User Info */}
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatarURL}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {rank}
                            {getRankSuffix(rank)} place
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {user.questionsAsked}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Asked
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {user.questionsAnswered}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Answered
                        </div>
                      </div>

                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${
                            rank === 1
                              ? "text-yellow-600"
                              : rank === 2
                                ? "text-gray-600"
                                : rank === 3
                                  ? "text-yellow-700"
                                  : "text-gray-900"
                          }`}
                        >
                          {user.totalScore}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Total
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex text-xs text-gray-600 mb-1">
                      <span>Questions Asked vs Answered</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500"
                          style={{
                            width:
                              user.totalScore > 0
                                ? `${(user.questionsAsked / user.totalScore) * 100}%`
                                : "50%",
                          }}
                        ></div>
                        <div
                          className="bg-green-500"
                          style={{
                            width:
                              user.totalScore > 0
                                ? `${(user.questionsAnswered / user.totalScore) * 100}%`
                                : "50%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {sortedUsers.length === 0 && (
          <div className="text-center py-12">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Users will appear here once they start participating in polls.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
