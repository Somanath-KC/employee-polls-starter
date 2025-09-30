import { Link, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../features/auth/authSlice";

export default function Navigation() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  const currentUser = users[user || ""];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              Employee Polls
            </Link>

            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/leaderboard"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                to="/add"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                New Poll
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser && (
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatarURL}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{currentUser.name}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
