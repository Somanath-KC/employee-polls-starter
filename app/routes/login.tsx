import LoginPage from "../../src/components/LoginPage";

export function meta() {
  return [
    { title: "Login - Employee Polls" },
    { name: "description", content: "Login to Employee Polls application" },
  ];
}

export default function Login() {
  return <LoginPage />;
}
