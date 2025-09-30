import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center" style={{ padding: "60px 20px" }}>
      <h1 style={{ fontSize: "72px", margin: "0", color: "#dc3545" }}>404</h1>
      <h2 style={{ marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ marginBottom: "30px", color: "#6c757d" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
}
