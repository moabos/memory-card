export interface PicsumData {
  id: string;
  author: string;
  url: string;
  download_url: string;
}

export interface LetterData {
  id: string;
  letter: string;
}

export type CardContent = LetterData[] | PicsumData[];

export function isLetterDataArray(arr: CardContent): arr is LetterData[] {
  return 'letter' in arr[0];
}
