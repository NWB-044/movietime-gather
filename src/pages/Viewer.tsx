import React, { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Chat } from "@/components/Chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Viewer = () => {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const { toast } = useToast();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
      toast({
        title: "Welcome!",
        description: `You've joined as ${username}`,
      });
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Join Stream</h1>
            <p className="text-muted-foreground">
              Enter your username to join the stream
            </p>
          </div>
          <form onSubmit={handleJoin} className="space-y-4">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
            <Button type="submit" className="w-full">
              Join Stream
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-4">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Stream Viewer</h1>
          <p className="text-muted-foreground">
            Welcome, {username}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9">
            <div className="aspect-video flex items-center justify-center border rounded-lg bg-accent/10">
              <p className="text-muted-foreground">
                Waiting for admin to start the stream...
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Chat
              messages={[]}
              onSendMessage={(content) => console.log("New message:", content)}
              className="h-[calc(100vh-12rem)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;