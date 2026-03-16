export interface WorkProject {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  summary: string;
  order: number;
  company: string;
  role: string;
  coverImage?: string;
  status: "shipped" | "ongoing" | "discontinued";
}

export interface SideProject {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  summary: string;
  order: number;
  icon: string;
  url?: string;
  github?: string;
}

export interface AcademicProject {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  summary: string;
  order: number;
  institution: string;
  context: string;
  pdfUrl?: string;
}

export interface HobbyItem {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  summary: string;
  order: number;
  category: string;
  image?: string;
}

export interface WritingPiece {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  status: "published" | "draft";
  readingTime: string;
  coverImage?: string;
}
