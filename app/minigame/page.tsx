'use client';

import React from 'react';

const MiniGames = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Mini Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Replace these with your game components */}
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Tic-Tac-Toe</h2>
          <p>Click to play!</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Memory Match</h2>
          <p>Click to play!</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Trivia Quiz</h2>
          <p>Click to play!</p>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
