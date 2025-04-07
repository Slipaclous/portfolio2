"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemoryGame } from "@/components/games/MemoryGame";
import { SnakeGame } from "@/components/games/SnakeGame";
import { BlackjackGame } from "@/components/games/BlackjackGame";
import { motion } from "framer-motion";
import { Gamepad2, Brain, MousePointerClick, Trophy, Dice1 } from "lucide-react";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export default function GamesPage() {
  const { language } = useLanguage();
  const t = translations[language].games;
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <motion.div 
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="text-center mb-12">
        <motion.h1 
          className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t.title}
        </motion.h1>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t.subtitle}
        </motion.p>
      </div>
      
      <Tabs defaultValue="memory" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-1">
          <TabsTrigger value="memory" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>{t.memory.title}</span>
          </TabsTrigger>
          <TabsTrigger value="snake" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <span>{t.snake.title}</span>
          </TabsTrigger>
          <TabsTrigger value="clicker" className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4" />
            <span>{t.clicker.title}</span>
          </TabsTrigger>
          <TabsTrigger value="blackjack" className="flex items-center gap-2">
            <Dice1 className="h-4 w-4" />
            <span>{t.blackjack.title}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="memory">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  {t.memory.title}
                </CardTitle>
                <CardDescription>{t.memory.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MemoryGame />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="snake">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 border-green-100 dark:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-green-600" />
                  {t.snake.title}
                </CardTitle>
                <CardDescription>{t.snake.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SnakeGame />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="clicker">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 border-purple-100 dark:border-purple-900 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="h-5 w-5 text-purple-600" />
                  {t.clicker.title}
                </CardTitle>
                <CardDescription>{t.clicker.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="flex justify-between w-full mb-6">
                    <div className="text-lg font-semibold">{t.clicker.points}: {score}</div>
                    <div className="text-sm text-gray-500">{t.clicker.best}: {highScore}</div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => {
                        setScore(prev => {
                          const newScore = prev + 1;
                          if (newScore > highScore) {
                            setHighScore(newScore);
                          }
                          return newScore;
                        });
                      }}
                      className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t.clicker.clickMe}
                    </Button>
                  </motion.div>
                  
                  <div className="mt-6 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setScore(0);
                      }}
                    >
                      {t.clicker.reset}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setScore(prev => prev + 10);
                      }}
                    >
                      {t.clicker.addPoints}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="blackjack">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 border-amber-100 dark:border-amber-900 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800">
                <CardTitle className="flex items-center gap-2">
                  <Dice1 className="h-5 w-5 text-amber-600" />
                  {t.blackjack.title}
                </CardTitle>
                <CardDescription>{t.blackjack.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <BlackjackGame />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center">
        <motion.div 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-full text-amber-800 dark:text-amber-100 border border-amber-200 dark:border-amber-700 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Trophy className="h-5 w-5 text-amber-500" />
          <span className="text-lg font-medium">{t.bestScore}: {highScore}</span>
        </motion.div>
      </div>
    </motion.div>
  );
} 