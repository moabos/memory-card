import { useEffect, useState } from 'react';
import Card from './Card';
import fetchImages from '../utils/fetchImages';
import getRandomLetters from '../utils/getRandomLetters';
import { ImageData } from '../utils/fetchImages';

interface CardsContainerProps {
  numberOfCards: number;
  cardType: 'Images' | 'Letters';
  hideAuthor: boolean;
}

function CardsContainer({ numberOfCards, cardType, hideAuthor }: CardsContainerProps) {
  const [cardContent, setCardContent] = useState<string[] | ImageData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const cardContent =
        cardType === 'Images' ? await fetchImages(numberOfCards) : getRandomLetters(numberOfCards);

      setCardContent(cardContent);
    }

    void fetchData();
  }, [cardType, numberOfCards]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {cardContent.map((element, index) => (
        <Card key={index} content={element} hideAuthor={hideAuthor} />
      ))}
    </div>
  );
}

export default CardsContainer;
