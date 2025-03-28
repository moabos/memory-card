import { useEffect, useRef, useState } from 'react';
import Card from './Card';
import fetchImages, { preloadImages } from '../utils/fetchImages';
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
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setCardContent((prev) => handleShuffle(prev));
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const data: CardContent =
        cardType === 'Images' ? await fetchImages(numberOfCards) : getRandomLetters(numberOfCards);

      if ('download_url' in data[0]) {
        const urls = data.map((img) => (img as { download_url: string }).download_url);
        await preloadImages(urls);
      }

      setCardContent(data);
      setIsLoading(false);
    }

    void fetchData();
  }, [cardType, numberOfCards]);

  useEffect(() => {
    window.scrollTo({
      top: scrollYRef.current,
      behavior: 'auto',
    });
  }, [cardContent]);

  if (isLoading) {
    return <div className="animate-pulse py-20 text-xl text-white">Loading cards...</div>;
  }

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
