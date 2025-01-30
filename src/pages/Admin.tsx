import React, { useState, useEffect } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FileManager } from "@/components/FileManager";
import { Chat } from "@/components/Chat";
import { StreamControls } from "@/components/StreamControls";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  type: "chat" | "system";
}

// Mock file structure with various formats
const mockFiles = [
  {
    name: "Movies",
    type: "folder" as const,
    path: "/movies",
    children: [
      {
        name: "Action",
        type: "folder" as const,
        path: "/movies/action",
        children: [
          {
            name: "Movie1.mp4",
            type: "file" as const,
            path: "/movies/action/movie1.mp4",
            format: "mp4"
          },
          {
            name: "Movie1.srt",
            type: "file" as const,
            path: "/movies/action/movie1.srt",
            format: "srt"
          }
        ],
      },
      {
        name: "Drama",
        type: "folder" as const,
        path: "/movies/drama",
        children: [
          {
            name: "Drama1.mkv",
            type: "file" as const,
            path: "/movies/drama/drama1.mkv",
            format: "mkv"
          },
          {
            name: "Drama1.vtt",
            type: "file" as const,
            path: "/movies/drama/drama1.vtt",
            format: "vtt"
          }
        ],
      }
    ],
  },
  {
    name: "TV Shows",
    type: "folder" as const,
    path: "/tv",
    children: [
      {
        name: "Series1.avi",
        type: "file" as const,
        path: "/tv/series1.avi",
        format: "avi"
      },
      {
        name: "Series1.ass",
        type: "file" as const,
        path: "/tv/series1.ass",
        format: "ass"
      }
    ],
  }
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminNickname, setAdminNickname] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      const joinMessage: Message = {
        id: crypto.randomUUID(),
        user: "System",
        content: `Admin ${adminNickname} has joined`,
        timestamp: new Date(),
        type: "system"
      };
      setMessages(prev => [...prev, joinMessage]);
    }
  }, [isAuthenticated, adminNickname]);

  const handleLogin = (nickname: string) => {
    setIsAuthenticated(true);
    setAdminNickname(nickname);
    console.log("Admin logged in:", nickname);
  };

  const handleStartStream = () => {
    setIsStreaming(true);
    toast({
      title: "Stream Started",
      description: "Viewers can now watch the stream.",
    });
    console.log("Stream started");
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    toast({
      title: "Stream Stopped",
      description: "The stream has been ended.",
    });
    console.log("Stream stopped");
  };

  const handlePauseStream = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Stream Resumed" : "Stream Paused",
      description: isPaused ? "Viewers can now watch again." : "Stream is paused for all viewers.",
    });
    console.log("Stream pause toggled:", !isPaused);
  };

  const handleSeek = (seconds: number) => {
    console.log(`Seeking ${seconds} seconds`);
    toast({
      title: "Seeking",
      description: `Seeking ${seconds > 0 ? "forward" : "backward"} ${Math.abs(seconds)} seconds`,
    });
  };

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    const fileName = path.split("/").pop() || "";
    setCurrentTitle(fileName);
    console.log("File selected:", path);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      user: `Admin ${adminNickname}`,
      content,
      timestamp: new Date(),
      type: "chat"
    };
    setMessages(prev => [...prev, newMessage]);
    console.log("Admin sent message:", content);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
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
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 animate-fade-in">
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
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl animate-fade-in">
              {selectedFile ? (
                <VideoPlayer
                  src={selectedFile}
                  isAdmin={true}
                  className="w-full h-full"
                  onTimeUpdate={(time) => console.log("Current time:", time)}
                  onPlayStateChange={(isPlaying) => console.log("Playing:", isPlaying)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-accent/10">
                  <p className="text-muted-foreground">
                    Select a file to start streaming
                  </p>
                </div>
              )}
            </div>
            <div className="lg:hidden animate-fade-in">
              <FileManager
                files={mockFiles}
                onFileSelect={handleFileSelect}
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="hidden lg:block animate-fade-in">
              <FileManager
                files={mockFiles}
                onFileSelect={handleFileSelect}
              />
            </div>
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              currentTitle={currentTitle}
              className="h-[400px] animate-fade-in"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;