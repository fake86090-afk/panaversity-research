import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";

export const runtime = "nodejs";

type GitHubCommitResponse = {
  content?: { path: string };
  commit?: { sha: string };
  message?: string;
};

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function fileExistsOnGitHub(
  owner: string,
  repo: string,
  branch: string,
  path: string,
  token: string
): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
      path
    )}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );
  if (res.status === 200) {
    const json = (await res.json()) as { sha?: string };
    return json.sha ?? null;
  }
  return null;
}

async function commitFileToGitHub(params: {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  content: string;
  message: string;
  token: string;
  sha?: string | null;
}): Promise<GitHubCommitResponse> {
  const { owner, repo, branch, path, content, message, token, sha } = params;
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
      path
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
      cache: "no-store",
    }
  );
  const json = (await res.json()) as GitHubCommitResponse;
  if (!res.ok) {
    throw new Error(json?.message || `GitHub commit failed: ${res.status}`);
  }
  return json;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing file field 'file'" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const raw = Buffer.from(arrayBuffer).toString("utf8");

    // Parse frontmatter, or synthesize it
    const parsed = matter(raw);
    const body = parsed.content?.trim() || "";
    const fm = parsed.data as Record<string, unknown>;

    const nowIso = new Date().toISOString();
    const titleFromH1Match = body.match(/^#\s+(.+)$/m)?.[1];
    const baseName = file.name.replace(/\.(md|mdx)$/i, "");
    const title = (fm.title as string) || titleFromH1Match || baseName;
    const slug = toSlug(baseName || title);
    const date = (fm.date as string) || nowIso;

    const finalFrontmatter: Record<string, unknown> = {
      title,
      date,
      author: (fm.author as string) || "Unknown",
      summary: fm.summary || "",
      tags: fm.tags || [],
      category: fm.category || "General Research",
      status: fm.status || "Draft",
      seo_description: fm.seo_description || "",
      keywords: fm.keywords || [],
      featured_image: fm.featured_image || "",
      research_team: fm.research_team || [],
      citations: fm.citations || [],
      github_repo: fm.github_repo || "",
      doi: fm.doi || "",
    };

    const fileContent = matter.stringify(body, finalFrontmatter);

    // Repo config from env
    const owner = process.env.GITHUB_REPO_OWNER || "";
    const repo = process.env.GITHUB_REPO_NAME || "";
    const branch = process.env.GITHUB_BRANCH || "master";
    const dir = process.env.GITHUB_CONTENT_DIR || "content/posts";
    const token = process.env.GITHUB_TOKEN || "";

    if (!owner || !repo || !token) {
      return NextResponse.json(
        { error: "Missing GitHub configuration env vars" },
        { status: 500 }
      );
    }

    const targetPath = `${dir}/${slug}.md`;
    const existingSha = await fileExistsOnGitHub(owner, repo, branch, targetPath, token);

    const result = await commitFileToGitHub({
      owner,
      repo,
      branch,
      path: targetPath,
      content: fileContent,
      message: existingSha
        ? `chore: update post ${slug}.md via import`
        : `feat: add post ${slug}.md via import`,
      token,
      sha: existingSha,
    });

    return NextResponse.json({
      ok: true,
      path: result?.content?.path || targetPath,
      slug,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


