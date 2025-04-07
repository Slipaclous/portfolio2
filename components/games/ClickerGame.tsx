"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import { motion, AnimatePresence } from "framer-motion";

type PointAnimation = {
  id: number;
  x: number;
  y: number;
  value: number;
};

export function ClickerGame() {
  const { language } = useLanguage();
  const t = translations[language].games.clicker;
  const [points, setPoints] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pointAnimations, setPointAnimations] = useState<PointAnimation[]>([]);
  const [nextAnimationId, setNextAnimationId] = useState(0);

  useEffect(() => {
    const savedBestScore = localStorage.getItem('clickerBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const value = Math.floor(Math.random() * 5) + 1;

    setPoints(prev => {
      const newPoints = prev + value;
      if (newPoints > bestScore) {
        setBestScore(newPoints);
        localStorage.setItem('clickerBestScore', newPoints.toString());
      }
      return newPoints;
    });

    setPointAnimations(prev => [
      ...prev,
      { id: nextAnimationId, x, y, value }
    ]);
    setNextAnimationId(prev => prev + 1);
  };

  const resetGame = () => {
    setPoints(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg font-semibold">{t.points}: {points}</div>
        <div className="text-lg font-semibold">{t.best}: {bestScore}</div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          onClick={handleClick}
          className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {t.clickMe}
        </Button>

        <AnimatePresence>
          {pointAnimations.map(animation => (
            <motion.div
              key={animation.id}
              initial={{ 
                opacity: 1,
                x: animation.x,
                y: animation.y,
                scale: 1
              }}
              animate={{ 
                opacity: 0,
                y: animation.y - 50,
                scale: 1.5
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute pointer-events-none text-white font-bold"
            >
              +{animation.value}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Button onClick={resetGame} variant="outline">
        {t.reset}
      </Button>
    </div>
  );
} 