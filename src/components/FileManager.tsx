import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Folder, File, ChevronRight } from "lucide-react";

interface FileItem {
  name: string;
  type: "file" | "folder";
  path: string;
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

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
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
              : onFileSelect(item.path)
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
          {item.type === "folder" ? (
            <Folder className="h-4 w-4 text-blue-400" />
          ) : (
            <File className="h-4 w-4 text-gray-400" />
          )}
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
      <div className="space-y-1">
        {files.map((file) => renderItem(file))}
      </div>
    </div>
  );
};