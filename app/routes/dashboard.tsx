import { MinecraftDashboard } from "~/components/minecraft-dashboard";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <MinecraftDashboard />;
}