import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <nav className="nav">
      <div className="container">
        <ul>
          <li>
            <Link to="/" style={{ fontWeight: "bold", fontSize: "18px" }}>
              Employee Polls
            </Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/add">New Poll</Link>
          </li>
          <li style={{ marginLeft: "auto" }}>
            {currentUser && (
              <span>
                <img
                  src={currentUser.avatarURL}
                  alt={currentUser.name}
                  className="avatar"
                  style={{ marginRight: "10px" }}
                />
                {currentUser.name}
              </span>
            )}
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
