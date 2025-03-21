import { ImageData } from 'src/utils/fetchImages';

interface CardProps {
  content: string | ImageData;
}

function Card({ content }: CardProps) {
  return (
    <div className="h-35 w-35 cursor-pointer content-center overflow-hidden rounded-xl bg-gray-300 text-center">
      {typeof content === 'string' ? (
        <span className="text-3xl font-bold">{content}</span>
      ) : (
        <>
          <img
            src={content.download_url}
            height={150}
            width={150}
            alt="Random image"
            data-id={content.id}
          />
          <span className="text-xs">{content.author}</span>
        </>
      )}
    </div>
  );
}

export default Card;
