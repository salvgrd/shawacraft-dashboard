import { useLoaderData } from "react-router";
import { MinecraftDashboard } from "~/dashboard/minecraft-dashboard";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const { VITE_MINECRAFT_SERVER_ADDRESS } = import.meta.env;

export async function loader() {
  const response: { online: boolean; players: any } = await fetch(
    `https://api.mcsrvstat.us/3/${VITE_MINECRAFT_SERVER_ADDRESS}`
  ).then((res) => res.json());

  return {
    serverStatus: response.online ? "online" : "offline",
    players: response.players.list,
  };
}

export default function Home() {
  const { serverStatus, players } = useLoaderData();
  return <MinecraftDashboard serverStatus={serverStatus} players={players} />;
}
