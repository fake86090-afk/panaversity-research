import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Helper function to get research projects
async function getResearchProjects() {
  const projectsDirectory = path.join(process.cwd(), "content/research_projects");
  if (!fs.existsSync(projectsDirectory)) return [];
  
  const files = fs.readdirSync(projectsDirectory);
  const projects = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        description: data.description,
        status: data.status,
        start_date: data.start_date,
        team: data.team || [],
        github_repos: data.github_repos || [],
      };
    })
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  
  return projects;
}

// Helper function to get AI agents
async function getAIAgents() {
  const agentsDirectory = path.join(process.cwd(), "content/ai_agents");
  if (!fs.existsSync(agentsDirectory)) return [];
  
  const files = fs.readdirSync(agentsDirectory);
  const agents = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(agentsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug: file.replace(/\.md$/, ""),
        name: data.name,
        description: data.description,
        capabilities: data.capabilities || [],
        status: data.status,
        github_repo: data.github_repo,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return agents;
}

export default async function ResearchPage() {
  const projects = await getResearchProjects();
  const agents = await getAIAgents();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Research Dashboard</h1>
        <p className="text-xl text-gray-600">
          Exploring the frontiers of AI, robotics, and agentic intelligence
        </p>
      </header>

      {/* Research Projects Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Active Research Projects</h2>
          <Link 
            href="/admin/#/collections/research_projects/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Project
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'Active' ? 'bg-green-100 text-green-800' :
                  project.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div>Started: {new Date(project.start_date).toLocaleDateString()}</div>
                {project.team.length > 0 && (
                  <div>Team: {project.team.join(", ")}</div>
                )}
              </div>
              
              {project.github_repos.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-2">GitHub Repositories:</div>
                  <div className="space-y-1">
                    {project.github_repos.map((repo, index) => (
                      <a 
                        key={index}
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline text-sm"
                      >
                        {repo.split('/').pop()}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No research projects yet. Create your first project to get started!</p>
          </div>
        )}
      </section>

      {/* AI Agents Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">AI Agents & Tools</h2>
          <Link 
            href="/admin/#/collections/ai_agents/new"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add New Agent
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{agent.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  agent.status === 'Production' ? 'bg-green-100 text-green-800' :
                  agent.status === 'Development' ? 'bg-blue-100 text-blue-800' :
                  agent.status === 'Testing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {agent.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{agent.description}</p>
              
              {agent.capabilities.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Capabilities:</div>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((capability, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {agent.github_repo && (
                <a 
                  href={agent.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>
        
        {agents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No AI agents yet. Create your first agent to get started!</p>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/#/collections/posts/new"
            className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold">Write New Post</div>
            <div className="text-sm text-gray-600">Create research content</div>
          </Link>
          
          <Link 
            href="/admin/#/collections/research_projects/new"
            className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">🔬</div>
            <div className="font-semibold">Start Project</div>
            <div className="text-sm text-gray-600">Begin new research</div>
          </Link>
          
          <Link 
            href="/admin/#/collections/ai_agents/new"
            className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="font-semibold">Create Agent</div>
            <div className="text-sm text-gray-600">Build AI tools</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
