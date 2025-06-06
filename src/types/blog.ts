export interface Post {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  author: string;
  date: string;
  likes?: number;
  image?: string;
  excerpt?: string;
  views?: number;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  replies: Comment[];
}
