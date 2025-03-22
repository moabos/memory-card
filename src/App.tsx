import { useState } from 'react';
import CardForm from './components/CardForm';
import Game from './components/Game';

type FormData = {
  numberOfCards: number;
  cardType: 'Images' | 'Letters';
};

function App() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [lastFormData, setLastFormData] = useState<FormData>({
    numberOfCards: 10,
    cardType: 'Images',
  });

  const [restartKey, setRestartKey] = useState(0);

  function handleSubmit(formData: { numberOfCards: number; cardType: 'Images' | 'Letters' }) {
    setSubmittedData(formData);
    setLastFormData(formData);
  }

  function handleRestartGame() {
    setRestartKey((prev) => prev + 1);
  }

  function handleNewGame() {
    setSubmittedData(null);
    setRestartKey(0);
  }

  return (
    <div className="flex w-full flex-col items-center bg-slate-700 py-10">
      {!submittedData ? (
        <CardForm
          onSubmit={handleSubmit}
          initialNumberOfCards={lastFormData.numberOfCards}
          initialCardType={lastFormData.cardType}
        />
      ) : (
        <Game
          numberOfCards={submittedData.numberOfCards}
          cardType={submittedData.cardType}
          onNewGame={handleNewGame}
          onRestart={handleRestartGame}
          key={restartKey}
        />
      )}
    </div>
  );
}

export default App;
