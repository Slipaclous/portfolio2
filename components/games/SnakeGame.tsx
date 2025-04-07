"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import { motion } from "framer-motion";

type Position = {
  x: number;
  y: number;
};

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const MIN_SPEED = 50;
const SPEED_INCREMENT = 2;

export function SnakeGame() {
  const { language } = useLanguage();
  const t = translations[language].games.snake;
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<string>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const gameLoopRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const eatSoundRef = useRef<HTMLAudioElement>();
  const gameOverSoundRef = useRef<HTMLAudioElement>();

  // Initialisation des sons
  useEffect(() => {
    eatSoundRef.current = new Audio('/sounds/eat.mp3');
    gameOverSoundRef.current = new Audio('/sounds/gameover.mp3');
    
    return () => {
      if (eatSoundRef.current) eatSoundRef.current.pause();
      if (gameOverSoundRef.current) gameOverSoundRef.current.pause();
    };
  }, []);

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setFood({ x, y });
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    generateFood();
    setIsPaused(false);
    setIsStarted(false);
  };

  // Gestion des touches
  useEffect(() => {
    if (!isStarted || gameOver || isPaused) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, isPaused, isStarted]);

  // Boucle de jeu optimisée
  useEffect(() => {
    if (!isStarted || gameOver || isPaused) return;

    const moveSnake = (timestamp: number) => {
      if (!lastUpdateRef.current) lastUpdateRef.current = timestamp;
      const deltaTime = timestamp - lastUpdateRef.current;

      if (deltaTime >= speed) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = { ...newSnake[0] };

          switch (direction) {
            case "UP":
              head.y -= 1;
              break;
            case "DOWN":
              head.y += 1;
              break;
            case "LEFT":
              head.x -= 1;
              break;
            case "RIGHT":
              head.x += 1;
              break;
          }

          if (
            head.x < 0 ||
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE ||
            newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
          ) {
            setGameOver(true);
            if (score > bestScore) {
              setBestScore(score);
            }
            if (gameOverSoundRef.current) gameOverSoundRef.current.play();
            return prevSnake;
          }

          newSnake.unshift(head);

          if (head.x === food.x && head.y === food.y) {
            setScore((prev) => prev + 10);
            setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
            generateFood();
            if (eatSoundRef.current) eatSoundRef.current.play();
          } else {
            newSnake.pop();
          }

          return newSnake;
        });

        lastUpdateRef.current = timestamp;
      }

      gameLoopRef.current = requestAnimationFrame(moveSnake);
    };

    gameLoopRef.current = requestAnimationFrame(moveSnake);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [direction, food, gameOver, isPaused, isStarted, generateFood, bestScore, score, speed]);

  if (!isStarted) {
    return (
      <motion.div 
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
            {t.ready}
          </h2>
          <p className="text-gray-600 mb-6">{t.instructions}</p>
          <Button 
            onClick={() => setIsStarted(true)} 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            {t.startGame}
          </Button>
        </div>
      </motion.div>
    );
  }

  if (gameOver) {
    return (
      <motion.div 
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{t.gameOver}</h2>
          <p className="text-xl mb-6">
            {t.finalScore}: {score}
          </p>
          <Button 
            onClick={resetGame} 
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
          >
            {t.newGame}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
          {t.score}: {score}
        </div>
        <div className="text-lg font-semibold text-gray-600">
          {t.best}: {bestScore}
        </div>
      </div>

      <div className="relative w-[400px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
        <div className="absolute inset-0">
          {snake.map((segment, index) => (
            <div
              key={`${segment.x}-${segment.y}-${index}`}
              className="absolute w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-sm shadow-md"
              style={{
                left: `${segment.x * CELL_SIZE}px`,
                top: `${segment.y * CELL_SIZE}px`,
                transform: `translate3d(0, 0, 0)`,
                willChange: 'transform',
                transition: `all ${speed}ms linear`
              }}
            />
          ))}
        </div>
        <motion.div
          className="absolute w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-md"
          style={{
            left: `${food.x * CELL_SIZE}px`,
            top: `${food.y * CELL_SIZE}px`,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={() => setIsPaused(!isPaused)}
          className={isPaused ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}
        >
          {isPaused ? t.resume : t.pause}
        </Button>
        <Button 
          onClick={resetGame} 
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          {t.newGame}
        </Button>
      </div>
    </motion.div>
  );
} 