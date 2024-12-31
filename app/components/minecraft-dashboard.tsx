import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type Player, PlayerList } from "./player-list";
import { ServerStatus } from "./server-status";

export function MinecraftDashboard() {
  const [serverStatus, setServerStatus] = useState<"online" | "offline">(
    "online"
  );
  const [players] = useState<Player[]>([
    { id: 1, name: "Steve", status: "online" },
    { id: 2, name: "Alex", status: "online" },
    { id: 3, name: "Creeper", status: "offline" },
  ]);

  const toggleServer = () => {
    setServerStatus(serverStatus === "online" ? "offline" : "online");
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold border-b-4 border-black pb-2">
          Minecraft Server Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Server Control</CardTitle>
            </CardHeader>
            <CardContent>
              <ServerStatus status={serverStatus} />
              <Button onClick={toggleServer} className="mt-4 w-full">
                {serverStatus === "online" ? "Stop Server" : "Start Server"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Player Management</CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerList players={players} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Server Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="seed">World Seed</Label>
                <Input
                  id="seed"
                  placeholder="Enter world seed"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gamemode">Default Gamemode</Label>
                <select
                  id="gamemode"
                  className="w-full border-2 bg-white border-black p-2 mt-1"
                >
                  <option>Survival</option>
                  <option>Creative</option>
                  <option>Adventure</option>
                  <option>Spectator</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                Update Configuration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
