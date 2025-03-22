import shuffleArray from './shuffleArray';
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

export interface LetterData {
  id: string;
  letter: string;
}

function getRandomLetters(length: number): LetterData[] {
  const letters: LetterData[] = LETTERS.map((letter, index) => ({
    id: index.toString(),
    letter,
  }));
  return shuffleArray(letters).slice(0, length);
}

export default getRandomLetters;
