import { useState } from 'react';
import CardForm from './components/CardForm';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(10);

  return (
    <main className="relative w-11/12 rounded-2xl border-4 bg-zinc-500 px-4 py-15 font-mono shadow-2xl shadow-black lg:w-1/2">
      <CardForm numberOfCards={numberOfCards} setNumberOfCards={setNumberOfCards} />
    </main>
  );
}

export default App;
