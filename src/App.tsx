import { useState } from 'react';
import CardForm from './components/CardForm';
import Game from './components/Game';

function App() {
  const [submittedData, setSubmittedData] = useState<{
    numberOfCards: number;
    cardType: 'Images' | 'Letters';
  } | null>(null);

  const [lastFormData, setLastFormData] = useState<{
    numberOfCards: number;
    cardType: 'Images' | 'Letters';
  }>({ numberOfCards: 10, cardType: 'Images' });

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
