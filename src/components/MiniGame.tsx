import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, RefreshCw, Zap, Star, Target } from "lucide-react";

interface GameTile {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🚀", "💻", "🎨", "⚡", "🌟", "🎯", "💡", "🔥"];

export const MiniGame = () => {
  const [tiles, setTiles] = useState<GameTile[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("memoryGameBest") || "0");
  });

  const initializeGame = useCallback(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setTiles(shuffled);
    setFlippedTiles([]);
    setMoves(0);
    setScore(0);
    setGameComplete(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleTileClick = (id: number) => {
    if (flippedTiles.length === 2) return;
    if (tiles[id].isFlipped || tiles[id].isMatched) return;

    const newTiles = [...tiles];
    newTiles[id].isFlipped = true;
    setTiles(newTiles);

    const newFlipped = [...flippedTiles, id];
    setFlippedTiles(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      if (tiles[newFlipped[0]].emoji === tiles[newFlipped[1]].emoji) {
        // Match found
        setTimeout(() => {
          const matchedTiles = [...tiles];
          matchedTiles[newFlipped[0]].isMatched = true;
          matchedTiles[newFlipped[1]].isMatched = true;
          setTiles(matchedTiles);
          setFlippedTiles([]);
          setScore((s) => s + 100);

          // Check if game complete
          if (matchedTiles.every((t) => t.isMatched)) {
            const finalScore = 100 * 8 + Math.max(0, (20 - moves) * 10);
            setScore(finalScore);
            setGameComplete(true);
            if (finalScore > bestScore) {
              setBestScore(finalScore);
              localStorage.setItem("memoryGameBest", finalScore.toString());
            }
          }
        }, 300);
      } else {
        // No match
        setTimeout(() => {
          const resetTiles = [...tiles];
          resetTiles[newFlipped[0]].isFlipped = false;
          resetTiles[newFlipped[1]].isFlipped = false;
          setTiles(resetTiles);
          setFlippedTiles([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Gamepad2 className="text-accent" size={24} />
          Memory Match
        </h3>
        <button
          onClick={initializeGame}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Restart game"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-secondary">
          <Target className="mx-auto text-accent mb-1" size={18} />
          <p className="text-2xl font-bold">{moves}</p>
          <p className="text-xs text-muted-foreground">Moves</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-secondary">
          <Zap className="mx-auto text-yellow-500 mb-1" size={18} />
          <p className="text-2xl font-bold">{score}</p>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-secondary">
          <Trophy className="mx-auto text-orange-500 mb-1" size={18} />
          <p className="text-2xl font-bold">{bestScore}</p>
          <p className="text-xs text-muted-foreground">Best</p>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {tiles.map((tile) => (
          <motion.button
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-lg text-2xl font-bold transition-all duration-300 ${
              tile.isFlipped || tile.isMatched
                ? "bg-gradient-to-br from-accent to-blue-500 text-white"
                : "bg-secondary hover:bg-secondary/80"
            } ${tile.isMatched ? "opacity-60" : ""}`}
          >
            {tile.isFlipped || tile.isMatched ? tile.emoji : "?"}
          </motion.button>
        ))}
      </div>

      {/* Game Complete Modal */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-6"
          >
            <Star className="mx-auto text-yellow-500 mb-2" size={48} />
            <h4 className="text-xl font-bold mb-2">🎉 Congratulations!</h4>
            <p className="text-muted-foreground mb-4">
              You completed the game in {moves} moves!
            </p>
            <button
              onClick={initializeGame}
              className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
