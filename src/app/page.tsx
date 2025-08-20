import Link from "next/link";
import { getAllPosts } from "@/app/lib/posts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Panaversity Research Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <div className="flex items-start space-x-4">
              {post.featured_image && (
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-2xl font-semibold text-blue-600 hover:underline block mb-2"
                >
                  {post.title}
                </Link>
                {post.summary && (
                  <p className="text-gray-700 mb-2">{post.summary}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.category && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {post.category}
                    </span>
                  )}
                  {post.status && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {post.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>{post.date}</span>
                  <span>—</span>
                  <span>{post.author}</span>
                  {post.github_repo && (
                    <>
                      <span>—</span>
                      <a 
                        href={post.github_repo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    </>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
