import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  WorkProject,
  SideProject,
  AcademicProject,
  HobbyItem,
  WritingPiece,
} from "@/types";

const contentDir = path.join(process.cwd(), "content");

function readMdxDir(dir: string): Array<{ slug: string; data: Record<string, unknown>; content: string }> {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.mdx$/, ""), data, content };
    });
}

export function getWorkProjects(): WorkProject[] {
  return readMdxDir(path.join(contentDir, "projects/work"))
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      year: data.year as number,
      tags: (data.tags as string[]) ?? [],
      summary: data.summary as string,
      order: (data.order as number) ?? 0,
      company: data.company as string,
      role: data.role as string,
      coverImage: data.coverImage as string | undefined,
      status: data.status as WorkProject["status"],
    }))
    .sort((a, b) => a.order - b.order);
}

export function getSideProjects(): SideProject[] {
  return readMdxDir(path.join(contentDir, "projects/side"))
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      year: data.year as number,
      tags: (data.tags as string[]) ?? [],
      summary: data.summary as string,
      order: (data.order as number) ?? 0,
      icon: data.icon as string,
      url: data.url as string | undefined,
      github: data.github as string | undefined,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getAcademicProjects(): AcademicProject[] {
  return readMdxDir(path.join(contentDir, "projects/academic"))
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      year: data.year as number,
      tags: (data.tags as string[]) ?? [],
      summary: data.summary as string,
      order: (data.order as number) ?? 0,
      institution: data.institution as string,
      context: data.context as string,
      pdfUrl: data.pdfUrl as string | undefined,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getHobbyItems(): HobbyItem[] {
  return readMdxDir(path.join(contentDir, "projects/hobby"))
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      year: data.year as number,
      tags: (data.tags as string[]) ?? [],
      summary: data.summary as string,
      order: (data.order as number) ?? 0,
      category: data.category as string,
      image: data.image as string | undefined,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getAllWriting(): WritingPiece[] {
  const isProd = process.env.NODE_ENV === "production";
  return readMdxDir(path.join(contentDir, "writing"))
    .filter(({ data }) => !isProd || data.status === "published")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      excerpt: data.excerpt as string,
      status: data.status as WritingPiece["status"],
      readingTime: readingTime(content).text,
      coverImage: data.coverImage as string | undefined,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getWritingBySlug(
  slug: string
): Promise<{ frontmatter: WritingPiece; source: string } | null> {
  const filePath = path.join(contentDir, "writing", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter: WritingPiece = {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    excerpt: data.excerpt as string,
    status: data.status as WritingPiece["status"],
    readingTime: readingTime(content).text,
    coverImage: data.coverImage as string | undefined,
  };

  return { frontmatter, source: content };
}
