import React, { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FileManager } from "@/components/FileManager";
import { Chat } from "@/components/Chat";
import { useToast } from "@/hooks/use-toast";

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
            name: "Movie 1.mp4",
            type: "file" as const,
            path: "/movies/action/movie1.mp4",
          },
        ],
      },
    ],
  },
  {
    name: "Anime",
    type: "folder" as const,
    path: "/anime",
    children: [
      {
        name: "Episode 1.mp4",
        type: "file" as const,
        path: "/anime/ep1.mp4",
      },
    ],
  },
];

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  type: "chat" | "system";
}

const mockMessages: Message[] = [
  {
    id: "1",
    user: "Admin",
    content: "Welcome to the stream!",
    timestamp: new Date(),
    type: "system" as const,
  },
];

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const { toast } = useToast();
  const isAdmin = true; // This would come from your auth system

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    toast({
      title: "File selected",
      description: `Now playing: ${path.split("/").pop()}`,
    });
  };

  const handleSendMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: isAdmin ? "Admin 👑" : "Viewer",
        content,
        timestamp: new Date(),
        type: "chat" as const,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-4">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Stream Together</h1>
          <p className="text-muted-foreground">
            Watch and chat in real-time with friends
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9 space-y-4">
            {selectedFile ? (
              <VideoPlayer
                src={selectedFile}
                isAdmin={isAdmin}
                className="w-full aspect-video"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center border rounded-lg bg-accent/10">
                <p className="text-muted-foreground">
                  Select a file to start streaming
                </p>
              </div>
            )}
            <FileManager
              files={mockFiles}
              onFileSelect={handleFileSelect}
              className="lg:hidden"
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <FileManager
              files={mockFiles}
              onFileSelect={handleFileSelect}
              className="hidden lg:block"
            />
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              currentTitle={selectedFile ? selectedFile.split("/").pop() : undefined}
              className="h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
