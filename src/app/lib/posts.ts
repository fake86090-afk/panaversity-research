import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;   // always a string
  author: string;
  summary?: string;
  tags?: string[];
  category?: string;
  status?: string;
  seo_description?: string;
  keywords?: string[];
  featured_image?: string;
  research_team?: string[];
  citations?: string[];
  github_repo?: string;
  doi?: string;
};

export async function getPostSlugs(): Promise<string[]> {
  return fs.readdirSync(postsDirectory).map((file) =>
    file.replace(/\.md$/, "")
  );
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  // Ensure date is always a string
  const formattedDate = new Date(data.date).toISOString().split("T")[0];

  const processedContent = await remark().use(html).process(content);
  let contentHtml = processedContent.toString();
  
  // Fix image paths: replace /img/ with the correct public path
  contentHtml = contentHtml.replace(/src="\/img\//g, 'src="/img/');

  return {
    slug,
    meta: {
      title: data.title as string,
      date: formattedDate,
      author: data.author as string,
      summary: data.summary as string,
      tags: data.tags as string[],
      category: data.category as string,
      status: data.status as string,
      seo_description: data.seo_description as string,
      keywords: data.keywords as string[],
      featured_image: data.featured_image as string,
      research_team: data.research_team as string[],
      citations: data.citations as string[],
      github_repo: data.github_repo as string,
      doi: data.doi as string,
    },
    contentHtml,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts
    .map((p) => ({
      slug: p.slug,
      ...p.meta,
    }))
    // Sort descending by date
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
