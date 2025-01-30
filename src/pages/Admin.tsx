import React, { useState } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FileManager } from "@/components/FileManager";
import { Chat } from "@/components/Chat";
import { StreamControls } from "@/components/StreamControls";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminNickname, setAdminNickname] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const { toast } = useToast();

  const handleLogin = (nickname: string) => {
    setIsAuthenticated(true);
    setAdminNickname(nickname);
  };

  const handleStartStream = () => {
    setIsStreaming(true);
    toast({
      title: "Stream Started",
      description: "Viewers can now watch the stream.",
    });
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    toast({
      title: "Stream Stopped",
      description: "The stream has been ended.",
    });
  };

  const handlePauseStream = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Stream Resumed" : "Stream Paused",
      description: isPaused ? "Viewers can now watch again." : "Stream is paused for all viewers.",
    });
  };

  const handleSeek = (seconds: number) => {
    console.log(`Seeking ${seconds} seconds`);
    // Implement seek logic here
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Login</h1>
            <p className="text-muted-foreground">
              Please enter your credentials to access the admin panel
            </p>
          </div>
          <AdminLogin onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground">
              Welcome back, {adminNickname} 👑
            </p>
          </div>
          <StreamControls
            isStreaming={isStreaming}
            isPaused={isPaused}
            onStartStream={handleStartStream}
            onPauseStream={handlePauseStream}
            onStopStream={handleStopStream}
            onSeek={handleSeek}
            onAutoPlayToggle={setAutoPlayEnabled}
            autoPlayEnabled={autoPlayEnabled}
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9 space-y-4">
            <VideoPlayer
              src=""
              isAdmin={true}
              className="w-full aspect-video"
              onTimeUpdate={(time) => console.log("Current time:", time)}
              onPlayStateChange={(isPlaying) => console.log("Playing:", isPlaying)}
            />
            <FileManager
              files={[]}
              onFileSelect={(path) => console.log("Selected file:", path)}
              className="lg:hidden"
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <FileManager
              files={[]}
              onFileSelect={(path) => console.log("Selected file:", path)}
              className="hidden lg:block"
            />
            <Chat
              messages={[]}
              onSendMessage={(content) => console.log("New message:", content)}
              className="h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;