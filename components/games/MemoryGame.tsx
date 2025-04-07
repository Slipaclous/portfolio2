"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import { motion } from "framer-motion";

export function MemoryGame() {
  const { language } = useLanguage();
  const t = translations[language].games.memory;
  const [cards, setCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const initializeGame = () => {
    const numbers = Array.from({ length: 8 }, (_, i) => i);
    const shuffledNumbers = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    setCards(shuffledNumbers);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setScore(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index])) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = newFlippedCards;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs(prev => [...prev, cards[firstIndex]]);
        setScore(prev => prev + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg font-semibold">{t.moves}: {moves}</div>
        <div className="text-lg font-semibold">{t.score}: {score}</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`w-20 h-20 rounded-lg cursor-pointer flex items-center justify-center text-2xl font-bold ${
              flippedCards.includes(index) || matchedPairs.includes(card)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {flippedCards.includes(index) || matchedPairs.includes(card) ? card : "?"}
          </motion.div>
        ))}
      </div>

      <Button onClick={initializeGame} className="mt-4">
        {t.newGame}
      </Button>
    </div>
  );
} 