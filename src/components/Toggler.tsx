interface TogglerProps {
  labels: string[];
  multi?: boolean;
  className?: string;
  buttonClass?: string;
  selectedClass?: string;
  unselectedClass?: string;
  selected: string | string[];
  onChange: (selected: string[] | string) => void;
}

function Toggler({
  labels,
  multi = false,
  className = 'w-fit bg-gray-200 p-1 rounded-full',
  buttonClass = 'px-4 py-2 rounded-full m-0.5 transition duration-500 hover:cursor-pointer',
  selectedClass = 'bg-gray-700 text-white',
  unselectedClass = '',
  selected,
  onChange,
}: TogglerProps) {
  function handleClick(label: string) {
    if (multi) {
      const current = selected as string[];
      const updated = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];
      onChange(updated);
    } else {
      onChange(label);
    }
  }

  function isSelected(label: string): boolean {
    return multi ? (selected as string[]).includes(label) : selected === label;
  }

  return (
    <div className={className}>
      {labels.map((label) => {
        const selectedStyle = isSelected(label) ? selectedClass : unselectedClass;

        return (
          <button
            key={label}
            type="button"
            className={`${buttonClass} ${selectedStyle}`}
            onClick={() => handleClick(label)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default Toggler;
