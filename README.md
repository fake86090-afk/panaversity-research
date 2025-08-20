# Panaversity Research Platform

A comprehensive research management platform built with Next.js 15 (App Router) and Decap CMS, designed for AI research teams to publish articles, manage research projects, and showcase AI agents.

## 🚀 Features

### Content Management
- **Decap CMS Integration** - Git-based content management with editorial workflow
- **Research Posts** - Rich markdown content with AI-friendly metadata
- **Research Projects** - Project tracking and team collaboration
- **AI Agents** - Tool and agent documentation management
- **Local Development** - Full local editing with `decap-server` proxy

### Research-Focused Features
- **SEO Optimization** - Built-in SEO fields and metadata
- **Research Metadata** - Categories, tags, status, team members
- **GitHub Integration** - Direct links to repositories and code
- **Citation Management** - Academic citation tracking
- **DOI Support** - Digital Object Identifier integration

### Technical Features
- **Next.js 15** - Latest App Router with full static generation
- **TypeScript** - Full type safety and IntelliSense
- **Tailwind CSS 4** - Modern, utility-first styling
- **Responsive Design** - Mobile-first research platform
- **Performance** - Optimized for research content discovery

## 🛠️ Setup

### Prerequisites
- Node.js 18+ 
- Git repository
- Netlify account (for production)

### Local Development

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd decap-cms
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Start Decap CMS Proxy** (in another terminal)
   ```bash
   npx decap-server
   ```

4. **Access the Platform**
   - Main site: http://localhost:3000
   - Research Dashboard: http://localhost:3000/research
   - CMS Admin: http://localhost:3000/admin

### Production Deployment

1. **Deploy to Netlify**
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `.next` (Next.js Runtime)

2. **Enable Netlify Services**
   - Identity (for CMS authentication)
   - Git Gateway (for Git operations)

3. **Configure Domain**
   - Set custom domain: `research.panaversity.org`
   - Update DNS settings

## 📚 Content Structure

### Research Posts (`content/posts/`)
```markdown
---
title: "Advanced Agentic AI Systems"
date: 2025-01-15T10:00:00.000Z
author: "Dr. AI Researcher"
summary: "Exploring next-generation autonomous AI systems"
tags: ["AI", "Autonomy", "Research"]
category: "AI Research"
status: "Published"
seo_description: "Comprehensive guide to agentic AI systems"
keywords: ["AI", "autonomous", "intelligence", "research"]
featured_image: "/img/agentic-ai.jpg"
research_team: ["Dr. AI Researcher", "Dr. ML Expert"]
citations: ["Smith et al. 2024", "Johnson 2023"]
github_repo: "https://github.com/panaversity/agentic-ai"
doi: "10.1000/example.2024"
---
```

### Research Projects (`content/research_projects/`)
```markdown
---
title: "Autonomous Robotics Platform"
description: "Building next-gen robotic systems"
start_date: 2025-01-01T00:00:00.000Z
status: "Active"
team: ["Dr. Robot", "Dr. AI"]
github_repos: ["https://github.com/panaversity/robotics-core"]
papers: ["Autonomous Robotics 2025"]
---
```

### AI Agents (`content/ai_agents/`)
```markdown
---
name: "Research Assistant Bot"
description: "AI-powered research assistant"
capabilities: ["Literature Review", "Data Analysis", "Report Generation"]
status: "Production"
github_repo: "https://github.com/panaversity/research-bot"
---
```

## 🔧 Configuration

### Decap CMS (`public/admin/index.html`)
- **Local Backend**: Uses `decap-server` proxy for local development
- **Production Backend**: Git Gateway with Netlify Identity
- **Editorial Workflow**: Draft → In Review → Ready → Published
- **Media Management**: Images stored in `public/img/`

### Next.js Configuration (`next.config.ts`)
- **Dynamic Rendering**: Content updates without rebuilds
- **Image Optimization**: Automatic image handling
- **SEO Ready**: Built-in metadata and Open Graph support

## 🎯 Research on Markdown Content Engines

### Current Implementation: Decap CMS
- **Pros**: Git-based, version control, collaborative editing
- **Cons**: Limited real-time collaboration, basic content modeling

### Alternative Engines for Future Consideration

#### 1. **Payload CMS** (Recommended for AI Teams)
- **Type**: Headless CMS with TypeScript
- **AI Integration**: Built-in AI content generation hooks
- **Real-time**: WebSocket-based live collaboration
- **Content Modeling**: Rich field types and relationships
- **API-First**: REST and GraphQL APIs
- **Self-hosted**: Full control over data and infrastructure

#### 2. **Contentlayer** (Next.js Native)
- **Type**: Content SDK for Next.js
- **Integration**: Native App Router support
- **Performance**: Zero-runtime, build-time content processing
- **Type Safety**: Automatic TypeScript types from content
- **Markdown**: Enhanced markdown with frontmatter validation

#### 3. **Strapi** (Enterprise Ready)
- **Type**: Headless CMS with admin panel
- **AI Ready**: Plugin ecosystem for AI integration
- **Scalability**: Enterprise-grade performance
- **Multi-tenant**: Support for multiple research teams
- **API**: REST, GraphQL, and SDK support

#### 4. **Ghost** (Publishing Focused)
- **Type**: Professional publishing platform
- **SEO**: Built-in SEO optimization
- **Membership**: Research team access control
- **Newsletter**: Built-in email marketing
- **Analytics**: Content performance tracking

### AI and Human Research Team Considerations

#### **Current Setup (Decap CMS)**
- ✅ **Git-based workflow** - Familiar for developers
- ✅ **Markdown support** - Easy for researchers
- ✅ **Version control** - Track research evolution
- ❌ **Limited AI integration** - No built-in AI assistance
- ❌ **Basic collaboration** - No real-time editing

#### **Future AI-Enhanced Options**

1. **Payload CMS + AI Plugins**
   - AI-powered content suggestions
   - Automated research summaries
   - Intelligent tagging and categorization
   - Real-time collaborative editing

2. **Custom AI Integration**
   - OpenAI GPT for content generation
   - Claude for research assistance
   - Automated literature review
   - AI-powered research insights

3. **Research-Specific Features**
   - Automated citation management
   - Research trend analysis
   - Collaborative annotation tools
   - AI-powered peer review

## 🚀 Future Roadmap

### Phase 1: Content Foundation ✅
- [x] Decap CMS integration
- [x] Research post management
- [x] Basic SEO optimization
- [x] Local development setup

### Phase 2: Research Management (Current)
- [x] Research projects collection
- [x] AI agents documentation
- [x] Enhanced metadata fields
- [x] Research dashboard

### Phase 3: AI Integration
- [ ] AI-powered content suggestions
- [ ] Automated research summaries
- [ ] Intelligent content categorization
- [ ] AI research assistant integration

### Phase 4: Advanced Features
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Research team management
- [ ] Automated publishing workflows

### Phase 5: Platform Evolution
- [ ] Evaluate markdown engine alternatives
- [ ] Implement AI-enhanced CMS
- [ ] Advanced research tools
- [ ] Multi-team collaboration features

## 🤝 Contributing

### For Researchers
1. Access CMS at `/admin`
2. Create research posts with rich metadata
3. Use editorial workflow for quality control
4. Link to GitHub repositories and papers

### For Developers
1. Fork the repository
2. Create feature branch
3. Implement changes
4. Submit pull request

### For AI Teams
1. Document AI agents and tools
2. Track research projects
3. Collaborate on content
4. Integrate AI workflows

## 📖 Documentation

- **CMS Guide**: `/admin` interface documentation
- **Content Guidelines**: Research post standards
- **API Reference**: Content management APIs
- **Deployment**: Production setup guide

## 🔗 Links

- **Live Site**: https://research.panaversity.org
- **CMS Admin**: https://research.panaversity.org/admin
- **GitHub**: [Repository Link]
- **Research Dashboard**: https://research.panaversity.org/research

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ by the Panaversity Research Team**

*Exploring the frontiers of AI, robotics, and agentic intelligence*
