import { useState } from 'react';
import CardsContainer from './CardsContainer';
import Toggler from './Toggler';
import shuffleArray from '../utils/shuffleArray';
import { CardContent, isLetterDataArray, PicsumData, LetterData } from '../types/CardContent';

interface GameProps {
  numberOfCards: number;
  cardType: 'Images' | 'Letters';
  onRestart: () => void;
  onNewGame: () => void;
}

function handleShuffle(content: CardContent): CardContent {
  return isLetterDataArray(content)
    ? shuffleArray<LetterData>(content)
    : shuffleArray<PicsumData>(content);
}

function Game({ numberOfCards, cardType, onRestart, onNewGame }: GameProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [score, setScore] = useState(0);
  const [gameOverReason, setGameOverReason] = useState<'win' | 'loss' | null>(null);

  function handleGameOver(reason: 'win' | 'loss') {
    setGameOverReason(reason);
    setSelectedOptions((prev) => (prev.includes('Hide Score') ? prev : [...prev, 'Hide Score']));
  }

  function handleScoreUpdate(newScore: number) {
    if (!gameOverReason) {
      setScore(newScore);
    }
  }

  return (
    <div className="flex flex-col items-center justify-around gap-4">
      <header
        className={`${selectedOptions.includes('Hide Score') ? 'opacity-0' : 'opacity-65'} pointer-events-none sticky top-0 z-10 min-w-1/2 rounded-md border-2 border-black bg-gray-400 py-1 text-center text-white shadow-lg transition-all duration-300 md:w-1/6`}
      >
        <h1 className="mx-3 rounded-lg bg-slate-900 py-1 text-lg shadow-md">
          Score: {score} / {numberOfCards}
        </h1>
      </header>

      <div className="flex w-11/12 flex-col items-center justify-center rounded-2xl border-4 bg-zinc-500 py-10 font-mono shadow-2xl shadow-black md:px-4 lg:w-3/4">
        {gameOverReason ? (
          <div className="flex flex-col gap-4 px-10 text-center">
            <h2
              className={`animate-bounce text-4xl font-bold uppercase ${
                gameOverReason === 'win' ? 'text-green-300' : 'text-red-400'
              }`}
            >
              {gameOverReason === 'win' ? 'You Win' : 'You Lost'}
            </h2>

            <span className="text-2xl font-semibold text-slate-100">Final Score:</span>
            <span className="text-2xl font-bold text-slate-100">
              {score} / {numberOfCards}
            </span>
          </div>
        ) : (
          <CardsContainer
            numberOfCards={numberOfCards}
            cardType={cardType}
            handleShuffle={handleShuffle}
            hideAuthor={selectedOptions.includes('Hide Author')}
            onGameOver={handleGameOver}
            onGameUpdate={handleScoreUpdate}
          />
        )}
      </div>

      <div className="mt-6 flex gap-10">
        <div
          className={`flex flex-col gap-1 ${gameOverReason ? 'scale-105 animate-pulse border-2 bg-slate-600 p-3' : ''}`}
        >
          <button
            type="button"
            onClick={onNewGame}
            className="rounded border border-slate-500 bg-zinc-700 px-4 py-2 font-medium text-slate-200 transition hover:cursor-pointer hover:bg-zinc-600 active:translate-y-1 active:shadow-md"
          >
            NEW GAME
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded border border-slate-500 bg-zinc-700 px-4 py-2 font-medium text-slate-200 transition hover:cursor-pointer hover:bg-zinc-600 active:translate-y-1 active:shadow-md"
          >
            RESTART GAME
          </button>
        </div>

        {!gameOverReason && (
          <Toggler
            multi
            labels={[...(cardType === 'Images' ? ['Hide Author'] : []), 'Hide Score']}
            selected={selectedOptions}
            onChange={(value) => setSelectedOptions(value as string[])}
            className="flex flex-col gap-1"
            buttonClass="rounded px-4 py-2 font-medium transition border border-slate-00 hover:cursor-pointer active:translate-y-1 active:shadow"
            selectedClass="bg-slate-300 text-zinc-900 shadow-inner scale-90"
            unselectedClass="bg-slate-800 text-slate-200 hover:bg-slate-600"
          />
        )}
      </div>
    </div>
  );
}

export default Game;
