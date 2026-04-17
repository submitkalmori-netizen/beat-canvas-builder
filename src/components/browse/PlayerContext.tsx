import { createContext, useContext, useState, ReactNode } from "react";
import type { Beat } from "./BeatRow";

interface PlayerState {
  current: Beat | null;
  isPlaying: boolean;
  play: (beat: Beat) => void;
  toggle: () => void;
  stop: () => void;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (beat: Beat) => {
    setCurrent(beat);
    setIsPlaying(true);
  };
  const toggle = () => setIsPlaying((p) => !p);
  const stop = () => {
    setCurrent(null);
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider value={{ current, isPlaying, play, toggle, stop }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};
