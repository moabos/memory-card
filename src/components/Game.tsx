import { useState } from 'react';
import CardsContainer from './CardsContainer';
import Toggler from './Toggler';

interface GameProps {
  numberOfCards: number;
  cardType: 'Images' | 'Letters';
  onRestart: () => void;
  onNewGame: () => void;
}

function Game({ numberOfCards, cardType, onRestart, onNewGame }: GameProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center justify-around gap-4">
      <header
        className={`${selectedOptions.includes('Hide Score') ? 'opacity-0' : 'opacity-65'} pointer-events-none sticky top-0 z-10 w-1/2 rounded-md border-2 border-black bg-gray-400 py-1 text-center text-white shadow-lg transition-all duration-300 md:w-1/6`}
      >
        <h1 className="mx-3 rounded-lg bg-slate-900 py-1 text-lg shadow-md">
          Score: {0} / {numberOfCards}
        </h1>
      </header>

      <div className="flex w-11/12 flex-col items-center justify-center rounded-2xl border-4 bg-zinc-500 py-10 font-mono shadow-2xl shadow-black md:px-4 lg:w-3/4">
        <CardsContainer
          numberOfCards={numberOfCards}
          cardType={cardType}
          hideAuthor={selectedOptions.includes('Hide Author')}
        />
      </div>

      <div className="mt-6 flex gap-10">
        <div className="flex flex-col gap-1">
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

        <Toggler
          multi
          labels={['Hide Author', 'Hide Score']}
          selected={selectedOptions}
          onChange={(value) => setSelectedOptions(value as string[])}
          className="flex flex-col gap-1"
          buttonClass="rounded px-4 py-2 font-medium transition border border-slate-00 hover:cursor-pointer active:translate-y-1 active:shadow"
          selectedClass="bg-slate-300 text-zinc-900 shadow-inner scale-[0.9]"
          unselectedClass="bg-slate-800 text-slate-200 hover:bg-slate-600"
        />
      </div>
    </div>
  );
}

export default Game;
