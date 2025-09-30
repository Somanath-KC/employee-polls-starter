import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/add", "routes/add.tsx"),
  route("/leaderboard", "routes/leaderboard.tsx"),
  route("/questions/:id", "routes/question.tsx"),
  route("/404", "routes/404.tsx"),
] satisfies RouteConfig;
