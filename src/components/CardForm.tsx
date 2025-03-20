import Toggler from './Toggler';
import Slider from './Slider';

interface CardFormProps {
  numberOfCards: number;
  setNumberOfCards: (value: number) => void;
}

function CardForm({ numberOfCards, setNumberOfCards }: CardFormProps) {
  return (
    <form className="flex flex-col gap-5">
      <label className="flex flex-col items-center gap-3 text-3xl font-bold">
        Number of cards
        <Slider value={numberOfCards} onChange={setNumberOfCards} />
      </label>

      <label className="self-center text-center">
        <span className="text-2xl font-semibold">Card Content</span>
        <Toggler
          labels={['Images', 'Letters']}
          selectedClass="bg-gray-500 shadow-lg shadow-black text-slate-200"
          className="flex rounded-full border-2 border-black bg-zinc-700 text-slate-300"
          defaultSelected="Images"
          onChange={() => {}}
        />
      </label>

      <button
        type="submit"
        className="absolute -bottom-[1.5rem] left-1/2 w-32 -translate-x-1/2 cursor-pointer rounded border-3 border-black bg-zinc-800 py-2 text-xl font-bold text-slate-300 transition-transform duration-300 ease-in-out hover:bg-gray-600 focus:bg-gray-600 active:translate-y-1 active:shadow active:shadow-black"
        onClick={(event) => event.preventDefault()}
      >
        Display
      </button>
    </form>
  );
}

export default CardForm;
