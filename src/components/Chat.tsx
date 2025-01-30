import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Smile } from "lucide-react";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
}

interface ChatProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  className?: string;
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col animate-fade-in"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{message.user}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm mt-1">{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

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