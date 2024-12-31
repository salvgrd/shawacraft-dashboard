export interface Player {
  uuid: string;
  name: string;
}

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <ul className="space-y-2">
      {players.map((player) => (
        <li
          key={player.uuid}
          className="flex items-center justify-between border-2 border-black p-2"
        >
          <span className="font-bold">{player.name}</span>
          <span className={`px-2 py-1 text-sm bg-green-200`}>Online</span>
        </li>
      ))}
    </ul>
  );
}
