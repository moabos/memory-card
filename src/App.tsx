import { useState } from 'react';
import CardForm from './components/CardForm';
import CardsContainer from './components/CardsContainer';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(10);
  const [submittedData, setSubmittedData] = useState<{
    numberOfCards: number;
    cardType: string;
  } | null>(null);

  function handleSubmit(formData: { numberOfCards: number; cardType: string }) {
    setSubmittedData(formData);
  }

  return (
    <main
      className={`relative w-11/12 rounded-2xl border-4 bg-zinc-500 px-4 py-10 font-mono shadow-2xl shadow-black lg:w-1/2 ${submittedData && 'overflow-y-scroll'}`}
    >
      {submittedData ? (
        <CardsContainer
          numberOfCards={submittedData.numberOfCards}
          cardType={submittedData.cardType as 'Images' | 'Letters'}
        />
      ) : (
        <CardForm
          numberOfCards={numberOfCards}
          setNumberOfCards={setNumberOfCards}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
