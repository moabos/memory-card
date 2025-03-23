import { PicsumData } from 'src/utils/fetchImages';
import { LetterData } from 'src/utils/getRandomLetters';

interface CardProps {
  id: string;
  content: PicsumData | LetterData;
  handleSelect: (id: string) => void;
  hideAuthor?: boolean;
}

function Card({ id, content, handleSelect, hideAuthor }: CardProps) {
  return (
    <button
      className="relative flex size-25 flex-col overflow-hidden rounded-xl border-2 bg-white text-center hover:cursor-pointer md:size-40"
      type="button"
      onClick={() => {
        handleSelect(id);
      }}
    >
      {'letter' in content ? (
        <span className="m-auto text-5xl font-bold sm:text-7xl md:text-9xl">{content.letter}</span>
      ) : (
        <div className="flex h-full w-full flex-col">
          <div className="h-full">
            <img
              src={content.download_url}
              className="h-full w-full object-fill"
              alt="Random image"
              data-id={content.id}
            />
          </div>
          {!hideAuthor && (
            <span className="absolute bottom-0 w-full bg-white px-1 py-1 text-xs text-gray-600 opacity-50">
              <a
                className="no-underline hover:underline"
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                {content.author}
              </a>
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export default Card;
