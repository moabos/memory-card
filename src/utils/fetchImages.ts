import getRandomLetters, { LetterData } from './getRandomLetters';
import shuffleArray from './shuffleArray';

export interface PicsumData {
  id: string;
  author: string;
  url: string;
  download_url: string;
}

async function fetchImages(numberOfImages: number): Promise<PicsumData[] | LetterData[]> {
  const maxPage = Math.floor(1000 / numberOfImages) - 1;
  const randomPage = Math.floor(Math.random() * maxPage);

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${randomPage}&limit=${numberOfImages}`
    );

    if (!response.ok) {
      throw new Error('Fetching failed. Falling back on letters.');
    }

    const data = (await response.json()) as PicsumData[];

    const images = data.map(
      (img): PicsumData => ({
        id: img.id,
        author: img.author,
        url: img.url,
        download_url: img.download_url,
      })
    );
    return shuffleArray(images);
  } catch {
    return getRandomLetters(numberOfImages);
  }
}

export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
}

export default fetchImages;
