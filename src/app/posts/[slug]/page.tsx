import { getPostBySlug, getPostSlugs } from "@/app/lib/posts";

type Params = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PostPage({ params }: Params) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = await getPostBySlug(slug);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <article className="prose prose-lg max-w-none">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
          
          {/* Meta information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>{post.meta.date}</span>
            <span>•</span>
            <span>By {post.meta.author}</span>
            {post.meta.status && (
              <>
                <span>•</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {post.meta.status}
                </span>
              </>
            )}
          </div>

          {/* Categories and tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.meta.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                {post.meta.category}
              </span>
            )}
            {post.meta.tags && post.meta.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>

          {/* Summary */}
          {post.meta.summary && (
            <p className="text-lg text-gray-700 italic border-l-4 border-blue-500 pl-4 mb-6">
              {post.meta.summary}
            </p>
          )}

          {/* Featured image */}
          {post.meta.featured_image && (
            <img 
              src={post.meta.featured_image} 
              alt={post.meta.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
        </header>

        {/* Content */}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {/* Footer metadata */}
        {(post.meta.research_team || post.meta.citations || post.meta.github_repo || post.meta.doi) && (
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Research team */}
              {post.meta.research_team && post.meta.research_team.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Research Team</h3>
                  <ul className="space-y-1">
                    {post.meta.research_team.map((member, index) => (
                      <li key={index} className="text-gray-600">{member}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Citations */}
              {post.meta.citations && post.meta.citations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Citations</h3>
                  <ul className="space-y-1">
                    {post.meta.citations.map((citation, index) => (
                      <li key={index} className="text-gray-600 text-sm">{citation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-4">
                  {post.meta.github_repo && (
                    <a 
                      href={post.meta.github_repo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {post.meta.doi && (
                    <a 
                      href={`https://doi.org/${post.meta.doi}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View DOI
                    </a>
                  )}
                </div>
              </div>
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
