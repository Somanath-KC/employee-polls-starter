import { Link } from "react-router";

export function meta() {
  return [
    { title: "Page Not Found - Employee Polls" },
    {
      name: "description",
      content: "The page you're looking for doesn't exist",
    },
  ];
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 text-lg">
            The poll or page you're looking for doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go back home
          </Link>

          <div className="text-sm text-gray-500">
            <p>Looking for something specific?</p>
            <div className="mt-2 space-x-4">
              <Link to="/add" className="text-blue-600 hover:text-blue-800">
                Create a poll
              </Link>
              <span>•</span>
              <Link
                to="/leaderboard"
                className="text-blue-600 hover:text-blue-800"
              >
                View leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
