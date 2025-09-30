import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../features/auth/authSlice";
import { fetchUsers } from "../features/users/usersSlice";

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users, loading } = useAppSelector((state) => state.users);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (Object.keys(users).length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedUser || !password) {
      setError("Please select a user and enter password");
      return;
    }

    const user = users[selectedUser];
    if (!user) {
      setError("User not found");
      return;
    }

    if (user.password !== password) {
      setError("Invalid password");
      return;
    }

    dispatch(login(selectedUser));
    navigate(from, { replace: true });
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%", padding: "20px" }}>
        <div className="text-center">
          <h2>Employee Polls</h2>
          <p>Please sign in to access the application</p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <div className="form-group">
            <label htmlFor="user-select">Select User</label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">Choose a user...</option>
              {Object.values(users).map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <div>
            <button type="submit" className="btn" style={{ width: "100%" }}>
              Sign In
            </button>
          </div>
        </form>

        <div
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#6c757d",
            textAlign: "center",
          }}
        >
          <p>Demo credentials:</p>
          <p>sarahedo / password123</p>
          <p>tylermcginnis / abc321</p>
          <p>mtsamis / xyz123</p>
        </div>
      </div>
    </div>
  );
}
