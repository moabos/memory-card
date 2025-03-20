import { useState } from 'react';

interface TogglerProps {
  labels: string[];
  className?: string;
  buttonClass?: string;
  selectedClass?: string;
  defaultSelected?: string;
  onChange: (selected: string) => void;
}

function Toggler({
  labels,
  className = 'w-fit bg-gray-200 p-1 rounded-full',
  buttonClass = 'px-4 py-2 rounded-full m-0.5 transition duration-500 hover:cursor-pointer',
  selectedClass = 'bg-gray-700',
  defaultSelected,
  onChange,
}: TogglerProps) {
  const [selected, setSelected] = useState(defaultSelected ?? labels[0] ?? '');

  return (
    <div className={className}>
      {labels.map((label) => (
        <button
          key={label}
          type="button"
          className={`${buttonClass} ${selected === label ? selectedClass : ''}`}
          onClick={() => {
            setSelected(label);
            onChange(label);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Toggler;
