import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Smile, MessageCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  type: "chat" | "system";
}

interface ChatProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentTitle?: string;
  className?: string;
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
  currentTitle,
  className,
}) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background/95 backdrop-blur-sm rounded-lg border",
        className
      )}
    >
      <div className="p-4 border-b flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">Chat</span>
      </div>

      {currentTitle && (
        <div className="px-4 py-2 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Now Playing: <span className="font-medium">{currentTitle}</span>
          </p>
        </div>
      )}

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col animate-fade-in",
                message.type === "system" && "opacity-75"
              )}
            >
              {index > 0 && (
                new Date(message.timestamp).toDateString() !== 
                new Date(messages[index - 1].timestamp).toDateString() && (
                  <div className="flex items-center gap-2 my-4">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                    <Separator className="flex-1" />
                  </div>
                )
              )}
              
              <div className="flex items-center space-x-2">
                <span className={cn(
                  "text-sm font-medium",
                  message.type === "system" && "text-muted-foreground"
                )}>
                  {message.user}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className={cn(
                "text-sm mt-1",
                message.type === "system" && "italic"
              )}>
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex items-center space-x-2"
      >
        <button
          type="button"
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <Smile className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 hover:bg-accent rounded-full transition-colors disabled:opacity-50"
          disabled={!input.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};