import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  X as Stop, 
  SkipBack, 
  SkipForward, 
  FastForward,
  Rewind
} from "lucide-react";

interface StreamControlsProps {
  isStreaming: boolean;
  isPaused: boolean;
  onStartStream: () => void;
  onPauseStream: () => void;
  onStopStream: () => void;
  onSeek: (seconds: number) => void;
  onAutoPlayToggle: (enabled: boolean) => void;
  autoPlayEnabled: boolean;
}

export const StreamControls: React.FC<StreamControlsProps> = ({
  isStreaming,
  isPaused,
  onStartStream,
  onPauseStream,
  onStopStream,
  onSeek,
  onAutoPlayToggle,
  autoPlayEnabled,
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-background/95 backdrop-blur-sm rounded-lg border">
      <Button
        variant={isStreaming ? "destructive" : "default"}
        onClick={isStreaming ? onStopStream : onStartStream}
        className="flex items-center gap-2"
      >
        {isStreaming ? <Stop className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isStreaming ? "Stop Stream" : "Start Stream"}
      </Button>

      <Button
        variant="outline"
        onClick={onPauseStream}
        disabled={!isStreaming}
        className="flex items-center gap-2"
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        {isPaused ? "Resume" : "Pause"}
      </Button>

      <Button
        variant="outline"
        onClick={() => onSeek(-10)}
        disabled={!isStreaming}
        className="flex items-center gap-2"
      >
        <Rewind className="h-4 w-4" />
        -10s
      </Button>

      <Button
        variant="outline"
        onClick={() => onSeek(10)}
        disabled={!isStreaming}
        className="flex items-center gap-2"
      >
        <FastForward className="h-4 w-4" />
        +10s
      </Button>

      <Button
        variant={autoPlayEnabled ? "secondary" : "outline"}
        onClick={() => onAutoPlayToggle(!autoPlayEnabled)}
        className="flex items-center gap-2"
      >
        {autoPlayEnabled ? <SkipForward className="h-4 w-4" /> : <SkipBack className="h-4 w-4" />}
        Auto-play
      </Button>
    </div>
  );
};