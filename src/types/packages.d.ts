declare module 'generate-unique-id' {
  export default function uniqueID(options?: {
    useLetters?: boolean;
    useNumbers?: boolean;
    length?: number;
  }): string;
}
