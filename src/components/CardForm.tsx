import { useState } from 'react';
import Toggler from './Toggler';
import Slider from './Slider';

interface CardFormProps {
  initialNumberOfCards: number;
  initialCardType: 'Images' | 'Letters';
  onSubmit: (formData: { numberOfCards: number; cardType: 'Images' | 'Letters' }) => void;
}

function CardForm({ initialNumberOfCards, initialCardType, onSubmit }: CardFormProps) {
  const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);
  const [selectedCardType, setSelectedCardType] = useState<'Images' | 'Letters'>(initialCardType);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({ numberOfCards, cardType: selectedCardType });
  }

  return (
    <form
      className="flex w-11/12 flex-col gap-5 rounded-xl border-4 border-black bg-zinc-500 p-8 shadow-2xl md:w-3/4"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col items-center gap-3 text-3xl font-bold">
        Number of cards
        <Slider value={numberOfCards} onChange={setNumberOfCards} />
      </label>

      <label className="self-center text-center">
        <span className="text-2xl font-semibold">Card Content</span>
        <Toggler
          labels={['Images', 'Letters']}
          selectedClass="bg-gray-500 shadow-lg text-slate-200"
          selected={selectedCardType}
          className="flex rounded-full border-2 border-black bg-zinc-700 text-slate-300"
          onChange={(value) => setSelectedCardType(value as 'Images' | 'Letters')}
        />
      </label>

      <button
        type="submit"
        className="w-32 cursor-pointer self-center rounded border-3 border-black bg-zinc-800 py-2 text-xl font-bold text-slate-300 transition hover:bg-gray-600 active:translate-y-1 active:shadow active:shadow-black"
      >
        Start Game
      </button>
    </form>
  );
}

export default CardForm;
