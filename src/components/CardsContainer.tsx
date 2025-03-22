import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Card from './Card';
import fetchImages from '../utils/fetchImages';
import getRandomLetters from '../utils/getRandomLetters';
import { CardContent } from '../types/CardContent';

interface CardsContainerProps {
  numberOfCards: number;
  cardType: 'Images' | 'Letters';
  handleShuffle: (content: CardContent) => CardContent;
  hideAuthor: boolean;
  onGameOver: (reason: 'win' | 'loss') => void;
  onGameUpdate: (score: number) => void;
}

function CardsContainer({
  numberOfCards,
  cardType,
  handleShuffle,
  hideAuthor,
  onGameOver,
  onGameUpdate,
}: CardsContainerProps) {
  const [cardContent, setCardContent] = useState<CardContent>([]);
  const [shuffle, setShuffle] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const scrollYRef = useRef<number>(0);

  function handleSelect(cardId: string) {
    if (selectedCards.includes(cardId)) {
      onGameOver('loss');
      return;
    }

    const newScore = selectedCards.length + 1;
    setSelectedCards((prev) => [...prev, cardId]);
    onGameUpdate(newScore);

    if (newScore === numberOfCards) {
      onGameOver('win');
      return;
    }

    scrollYRef.current = window.scrollY;
    setShuffle((prev) => !prev);
  }

  useEffect(() => {
    if (cardContent.length === 0) return;
    const shuffled = handleShuffle(cardContent);
    setCardContent(shuffled);
  }, [shuffle]);

  useEffect(() => {
    async function fetchData() {
      const data: CardContent =
        cardType === 'Images' ? await fetchImages(numberOfCards) : getRandomLetters(numberOfCards);

      setCardContent(data);
    }

    void fetchData();
  }, [cardType, numberOfCards]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: scrollYRef.current,
      behavior: 'auto',
    });
  }, [cardContent]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {cardContent.map((content) => (
        <Card
          id={content.id}
          key={content.id}
          content={content}
          handleSelect={handleSelect}
          hideAuthor={hideAuthor}
        />
      ))}
    </div>
  );
}

export default CardsContainer;
