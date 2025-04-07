"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import { motion } from "framer-motion";

type Card = {
  suit: string;
  value: string;
};

export function BlackjackGame() {
  const { language } = useLanguage();
  const t = translations[language].games.blackjack;
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'dealer' | 'ended'>('playing');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const suits = ['♠', '♣', '♥', '♦'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const createDeck = () => {
    const newDeck: Card[] = [];
    for (const suit of suits) {
      for (const value of values) {
        newDeck.push({ suit, value });
      }
    }
    return shuffleDeck(newDeck);
  };

  const shuffleDeck = (deck: Card[]) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateScore = (hand: Card[]) => {
    let score = 0;
    let aces = 0;

    for (const card of hand) {
      if (card.value === 'A') {
        aces += 1;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }

    for (let i = 0; i < aces; i++) {
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    }

    return score;
  };

  const checkBlackjack = (hand: Card[]) => {
    return hand.length === 2 && calculateScore(hand) === 21;
  };

  const startNewGame = () => {
    const newDeck = createDeck();
    const playerCards = [newDeck[0], newDeck[1]];
    const dealerCards = [newDeck[2], newDeck[3]];
    
    setDeck(newDeck.slice(4));
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameStatus('playing');
    setMessage('');

    // Vérifier le blackjack naturel
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);
    
    if (playerScore === 21) {
      setGameStatus('ended');
      setMessage(t.blackjack);
      setScore(prev => {
        const newScore = prev + 2;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
    } else if (dealerScore === 21) {
      setGameStatus('ended');
      setMessage(t.dealerBlackjack);
    }
  };

  const hit = () => {
    const newCard = deck[0];
    setPlayerHand([...playerHand, newCard]);
    setDeck(deck.slice(1));

    const newScore = calculateScore([...playerHand, newCard]);
    if (newScore > 21) {
      setGameStatus('ended');
      setMessage(t.bust);
    }
  };

  const stand = async () => {
    setGameStatus('dealer');
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];

    while (calculateScore(currentDealerHand) < 17) {
      const newCard = currentDeck[0];
      currentDealerHand.push(newCard);
      currentDeck = currentDeck.slice(1);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setDealerHand(currentDealerHand);
    setDeck(currentDeck);
    setGameStatus('ended');

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(currentDealerHand);

    if (dealerScore > 21) {
      setMessage(t.dealerBust);
      setScore(prev => {
        const newScore = prev + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
    } else if (dealerScore > playerScore) {
      setMessage(t.dealerWins);
    } else if (dealerScore < playerScore) {
      setMessage(t.playerWins);
      setScore(prev => {
        const newScore = prev + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
    } else {
      setMessage(t.push);
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const renderCard = (card: Card, index: number) => {
    const isRed = card.suit === '♥' || card.suit === '♦';
    return (
      <motion.div
        key={`${card.suit}-${card.value}-${index}`}
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`w-20 h-28 bg-white border-2 rounded-lg shadow-lg flex flex-col items-center justify-center text-xl font-bold ${
          isRed ? 'text-red-500 border-red-200' : 'text-black border-gray-200'
        }`}
      >
        <div className="absolute top-1 left-1">{card.value}</div>
        <div className="text-2xl">{card.suit}</div>
        <div className="absolute bottom-1 right-1 rotate-180">{card.value}</div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex justify-between w-full max-w-md mb-4">
        <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">
          {t.score}: {score}
        </div>
        <div className="text-lg font-semibold text-gray-600">
          {t.best}: {bestScore}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-gray-700">{t.dealer}: {calculateScore(dealerHand)}</div>
        <div className="flex gap-2">
          {dealerHand.map((card, index) => renderCard(card, index))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-gray-700">{t.player}: {calculateScore(playerHand)}</div>
        <div className="flex gap-2">
          {playerHand.map((card, index) => renderCard(card, index))}
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl font-bold text-center bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent"
        >
          {message}
        </motion.div>
      )}

      <div className="flex gap-4">
        {gameStatus === 'playing' && (
          <>
            <Button 
              onClick={hit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              {t.hit}
            </Button>
            <Button 
              onClick={stand}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              {t.stand}
            </Button>
          </>
        )}
        <Button 
          onClick={startNewGame}
          variant="outline"
          className="border-amber-500 text-amber-500 hover:bg-amber-50"
        >
          {t.newGame}
        </Button>
      </div>
    </div>
  );
} 