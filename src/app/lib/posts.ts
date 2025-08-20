import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

// GitHub config via env for server-side fetches
const FETCH_FROM_GITHUB = process.env.GITHUB_FETCH === "true";
const GITHUB_OWNER = process.env.GITHUB_REPO_OWNER || "";
const GITHUB_REPO = process.env.GITHUB_REPO_NAME || "";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const GITHUB_DIR = process.env.GITHUB_CONTENT_DIR || "content/posts";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ""; // server-side only

export type PostMeta = {
	slug: string;
	title: string;
	date: string; // always a string
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

async function listGitHubMarkdownFiles(): Promise<string[]> {
	const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DIR}?ref=${GITHUB_BRANCH}`;
	const res = await fetch(apiUrl, {
		headers: GITHUB_TOKEN
			? { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" }
			: { Accept: "application/vnd.github+json" },
		// Avoid Next caching
		next: { revalidate: 0 },
	});
	if (!res.ok) {
		throw new Error(`Failed to list GitHub posts: ${res.status} ${res.statusText}`);
	}
	const files: Array<{ name: string; type: string }> = await res.json();
	return files
		.filter((f) => f.type === "file" && (f.name.endsWith(".md") || f.name.endsWith(".mdx")))
		.map((f) => f.name.replace(/\.(md|mdx)$/i, ""));
}

async function readGitHubPost(slug: string): Promise<string> {
	const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${GITHUB_DIR}/${slug}.md`;
	const res = await fetch(rawUrl, {
		headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined,
		next: { revalidate: 0 },
	});
	if (!res.ok) {
		throw new Error(`Failed to fetch GitHub post ${slug}: ${res.status} ${res.statusText}`);
	}
	return await res.text();
}

export async function getPostSlugs(): Promise<string[]> {
	if (FETCH_FROM_GITHUB && GITHUB_OWNER && GITHUB_REPO) {
		return await listGitHubMarkdownFiles();
	}
	return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string) {
	let fileContents: string;
	if (FETCH_FROM_GITHUB && GITHUB_OWNER && GITHUB_REPO) {
		fileContents = await readGitHubPost(slug);
	} else {
		const fullPath = path.join(postsDirectory, `${slug}.md`);
		fileContents = fs.readFileSync(fullPath, "utf8");
	}

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
