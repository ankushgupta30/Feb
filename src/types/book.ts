export type ReadingStatus = "not-started" | "reading" | "completed";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: ReadingStatus;
}