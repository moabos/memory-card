import { useEffect, useState } from 'react';
import Card from './Card';
import fetchImages from '../utils/fetchImages';
import getRandomLetters from '../utils/getRandomLetters';
import { ImageData } from '../utils/fetchImages';

interface CardsContainerProps {
  numberOfCards: number;
  cardType: 'Images' | 'Letters';
}

function CardsContainer({ numberOfCards, cardType }: CardsContainerProps) {
  const [cardContent, setCardContent] = useState<string[] | ImageData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cardContent =
          cardType === 'Images'
            ? await fetchImages(numberOfCards)
            : getRandomLetters(numberOfCards);

        setCardContent(cardContent);
      } catch {
        return;
      }
    }

    void fetchData();
  }, [cardType, numberOfCards]);

  return (
    <div className="container flex w-full flex-wrap items-center justify-center gap-2 py-5">
      {cardContent.map((element, index) => (
        <Card key={index} content={element} />
      ))}
    </div>
  );
}

export default CardsContainer;
