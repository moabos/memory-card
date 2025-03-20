import { useState } from 'react';
import Toggler from './components/Toggler';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(10);

  return (
    <div className="relative w-1/2 rounded-2xl border-4 bg-gray-400 p-15 shadow-2xl shadow-black">
      <form className="flex flex-col gap-5">
        <label className="flex flex-col items-center gap-3 text-4xl font-bold">
          Number of cards
          <div className="flex w-5/6 flex-col items-center gap-2 rounded-2xl border-4 bg-stone-800 p-6">
            <input
              type="range"
              min={3}
              max={30}
              step={1}
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(Number(e.target.value))}
              className="h-4 w-full cursor-pointer appearance-none border-2 border-black bg-gradient-to-r from-gray-700 to-red-900 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-2xl [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:!bg-gray-700"
            />
            <span className="text-2xl text-slate-300">{numberOfCards}</span>
          </div>
        </label>

        <label className="self-center text-center">
          <span className="text-2xl font-bold">Card Content</span>
          <Toggler
            labels={['Images', 'Letters']}
            selectedClass="bg-gray-500"
            className="rounded-full bg-zinc-800 text-slate-300"
            defaultSelected="Images"
            onChange={() => {}}
          />
        </label>

        <button
          type="submit"
          className="absolute -bottom-[1rem] left-1/2 w-1/5 -translate-x-1/2 cursor-pointer rounded border-3 bg-zinc-400 py-2 text-xl font-bold transition-transform duration-300 ease-in-out hover:bg-zinc-500 active:translate-y-0.5 active:shadow active:shadow-black"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Fetch
        </button>
      </form>
    </div>
  );
}

export default App;
