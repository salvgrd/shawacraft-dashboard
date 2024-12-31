import { Login } from "~/login/login";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Shawacraft!" },
  ];
}

export default function Auth() {
  return <Login />;
}
