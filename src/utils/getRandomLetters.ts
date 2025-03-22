import shuffleArray from './shuffleArray';
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

function getRandomLetters(length: number): string[] {
  return shuffleArray([...LETTERS]).slice(0, length);
}

export default getRandomLetters;
