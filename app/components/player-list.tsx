export interface Player {
  id: number;
  name: string;
  status: "online" | "offline";
}

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <ul className="space-y-2">
      {players.map((player) => (
        <li
          key={player.id}
          className="flex items-center justify-between border-2 border-black p-2"
        >
          <span className="font-bold">{player.name}</span>
          <span
            className={`px-2 py-1 text-sm ${
              player.status === "online" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {player.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
