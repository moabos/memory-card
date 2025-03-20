interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

function Slider({ value, onChange }: SliderProps) {
  return (
    <div className="flex w-5/6 flex-col items-center gap-2 rounded-2xl border-4 bg-zinc-700 p-6 shadow-inner shadow-black">
      <input
        type="range"
        min={3}
        max={30}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-4 w-full cursor-pointer appearance-none border-2 border-black bg-gradient-to-r from-gray-700 to-red-900 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-2xl [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:!bg-gray-700"
      />
      <span className="text-2xl text-slate-300">{value}</span>
    </div>
  );
}

export default Slider;
