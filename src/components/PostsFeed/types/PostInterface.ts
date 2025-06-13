export interface PostInterface {
  id: string;
  name: string;
  tagline: string;
  votesCount: number;
  url: string;
  thumbnail?: {
    url: string;
  };
}
