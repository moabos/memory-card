import getRandomLetters from './getRandomLetters';
import shuffleArray from './shuffleArray';

export interface ImageData {
  id: string;
  author: string;
  url: string;
  download_url: string;
}

async function fetchImages(numberOfImages: number): Promise<string[] | ImageData[]> {
  const maxPage = Math.floor(1000 / numberOfImages) - 1;
  const randomPage = Math.floor(Math.random() * maxPage);

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${randomPage}&limit=${numberOfImages}`
    );

    if (!response.ok) {
      throw new Error('Fetching failed. Falling back on letters.');
    }

    const data = (await response.json()) as ImageData[];

    const images: ImageData[] = data.map(
      (img): ImageData => ({
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

export default fetchImages;
