import { ImageData } from 'src/utils/fetchImages';

interface CardProps {
  content: string | ImageData;
  hideAuthor?: boolean;
}

function Card({ content, hideAuthor }: CardProps) {
  return (
    <div className="relative flex size-25 flex-col overflow-hidden rounded-xl border-2 text-center md:size-40">
      {typeof content === 'string' ? (
        <span className="m-auto text-3xl font-bold">{content}</span>
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
            <span className="absolute bottom-0 left-0 w-full bg-white px-1 py-1 text-xs text-gray-600 opacity-50">
              <a className="no-underline hover:underline" href={content.url}>
                {content.author}
              </a>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;
