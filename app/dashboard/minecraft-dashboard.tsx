import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { PlayerList, type Player } from "~/components/player-list";
import { ServerStatus } from "~/components/server-status";

type Props = {
  serverStatus: "online" | "offline";
  players: Player[];
};

export function MinecraftDashboard({ serverStatus, players }: Props) {
  const toggleServer = () => {};

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
      </div>
    </main>
  );
}
