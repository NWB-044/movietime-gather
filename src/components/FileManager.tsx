import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Folder, File, ChevronRight, Film, Subtitles } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  name: string;
  type: "file" | "folder";
  path: string;
  format?: string;
  children?: FileItem[];
}

interface FileManagerProps {
  files: FileItem[];
  onFileSelect: (path: string) => void;
  className?: string;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  onFileSelect,
  className,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") return <Folder className="h-4 w-4 text-blue-400" />;
    
    const format = item.format?.toLowerCase() || item.name.split('.').pop()?.toLowerCase();
    
    if (format && ['mp4', 'mkv', 'avi', 'mov'].includes(format)) {
      return <Film className="h-4 w-4 text-purple-400" />;
    }
    
    if (format && ['srt', 'vtt', 'ass'].includes(format)) {
      return <Subtitles className="h-4 w-4 text-green-400" />;
    }
    
    return <File className="h-4 w-4 text-gray-400" />;
  };

  const handleFileSelect = (item: FileItem) => {
    if (item.type === "file") {
      onFileSelect(item.path);
      toast({
        title: "File Selected",
        description: `Now playing: ${item.name}`,
      });
      console.log("File selected:", item);
    }
  };

  const renderItem = (item: FileItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.path);

    return (
      <div key={item.path} className="animate-fade-in">
        <div
          className={cn(
            "flex items-center p-2 hover:bg-accent/50 rounded-md cursor-pointer transition-colors",
            "space-x-2"
          )}
          style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
          onClick={() =>
            item.type === "folder"
              ? toggleFolder(item.path)
              : handleFileSelect(item)
          }
        >
          {item.type === "folder" && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          )}
          {getFileIcon(item)}
          <span className="text-sm">{item.name}</span>
        </div>
        {item.type === "folder" && isExpanded && item.children && (
          <div className="ml-2">
            {item.children.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-background/95 backdrop-blur-sm border",
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-4">File Manager</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-1">
          {files.map((file) => renderItem(file))}
        </div>
      </ScrollArea>
    </div>
  );
};