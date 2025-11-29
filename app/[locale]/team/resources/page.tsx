"use client";

import {
  ExternalLink,
  Zap,
  Database,
  Github,
  Mail,
  Calendar,
  FileText,
  Video,
  BookOpen,
  Globe,
  MessageSquare,
  CreditCard,
  Cloud,
  Code,
  Layers,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: "automation" | "development" | "communication" | "documentation";
  color: string;
}

interface Resource {
  name: string;
  description: string;
  url: string;
  type: "doc" | "video" | "link";
}

const tools: Tool[] = [
  {
    name: "n8n",
    description: "Workflow automation platform",
    url: "https://n8n.flowko.io",
    icon: <Zap className="w-6 h-6" />,
    category: "automation",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Supabase",
    description: "Database & authentication",
    url: "https://supabase.com/dashboard",
    icon: <Database className="w-6 h-6" />,
    category: "development",
    color: "from-emerald-500 to-green-500",
  },
  {
    name: "GitHub",
    description: "Code repository & version control",
    url: "https://github.com/flowko-agency",
    icon: <Github className="w-6 h-6" />,
    category: "development",
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Vercel",
    description: "Hosting & deployments",
    url: "https://vercel.com/dashboard",
    icon: <Cloud className="w-6 h-6" />,
    category: "development",
    color: "from-gray-800 to-black",
  },
  {
    name: "Gmail",
    description: "Team email",
    url: "https://mail.google.com",
    icon: <Mail className="w-6 h-6" />,
    category: "communication",
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Google Calendar",
    description: "Scheduling & meetings",
    url: "https://calendar.google.com",
    icon: <Calendar className="w-6 h-6" />,
    category: "communication",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Slack",
    description: "Team communication",
    url: "https://slack.com",
    icon: <MessageSquare className="w-6 h-6" />,
    category: "communication",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Stripe",
    description: "Payments & billing",
    url: "https://dashboard.stripe.com",
    icon: <CreditCard className="w-6 h-6" />,
    category: "automation",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Notion",
    description: "Documentation & wiki",
    url: "https://notion.so",
    icon: <FileText className="w-6 h-6" />,
    category: "documentation",
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "Figma",
    description: "Design & prototyping",
    url: "https://figma.com",
    icon: <Layers className="w-6 h-6" />,
    category: "development",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "OpenAI",
    description: "AI API & playground",
    url: "https://platform.openai.com",
    icon: <Box className="w-6 h-6" />,
    category: "automation",
    color: "from-teal-500 to-green-500",
  },
  {
    name: "Anthropic",
    description: "Claude AI API",
    url: "https://console.anthropic.com",
    icon: <Code className="w-6 h-6" />,
    category: "automation",
    color: "from-amber-500 to-orange-500",
  },
];

const resources: Resource[] = [
  {
    name: "n8n Documentation",
    description: "Official n8n docs and tutorials",
    url: "https://docs.n8n.io",
    type: "doc",
  },
  {
    name: "n8n Community",
    description: "Community forum and templates",
    url: "https://community.n8n.io",
    type: "link",
  },
  {
    name: "Supabase Docs",
    description: "Database and auth documentation",
    url: "https://supabase.com/docs",
    type: "doc",
  },
  {
    name: "Next.js Documentation",
    description: "React framework docs",
    url: "https://nextjs.org/docs",
    type: "doc",
  },
  {
    name: "Tailwind CSS",
    description: "CSS framework documentation",
    url: "https://tailwindcss.com/docs",
    type: "doc",
  },
  {
    name: "OpenAI API Docs",
    description: "GPT and embeddings API",
    url: "https://platform.openai.com/docs",
    type: "doc",
  },
];

const categoryLabels = {
  automation: "Automation",
  development: "Development",
  communication: "Communication",
  documentation: "Documentation",
};

const typeIcons = {
  doc: <BookOpen className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  link: <Globe className="w-4 h-4" />,
};

export default function ResourcesPage() {
  const groupedTools = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, Tool[]>
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-n-1 mb-2">
          Resources & Tools
        </h1>
        <p className="text-n-3">
          Quick access to all the tools and documentation you need.
        </p>
      </div>

      {/* Tools by Category */}
      <div className="space-y-8 mb-12">
        {(Object.keys(groupedTools) as Array<keyof typeof categoryLabels>).map(
          (category) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-n-1 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-color-1" />
                {categoryLabels[category]}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groupedTools[category].map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-n-7 border border-n-6 rounded-xl hover:border-n-5 hover:-translate-y-1 transition-all"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 text-white",
                        tool.color
                      )}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-n-1 group-hover:text-color-1 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-n-4 mt-1">
                          {tool.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-n-5 group-hover:text-n-3 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Documentation & Learning Resources */}
      <div>
        <h2 className="text-lg font-semibold text-n-1 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-n-4" />
          Documentation & Learning
        </h2>
        <div className="bg-n-7 border border-n-6 rounded-xl divide-y divide-n-6">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 hover:bg-n-6/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-n-6 rounded-lg flex items-center justify-center text-n-3 group-hover:text-n-1 transition-colors">
                  {typeIcons[resource.type]}
                </div>
                <div>
                  <h3 className="font-medium text-n-1 group-hover:text-color-1 transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-n-4">{resource.description}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-n-5 group-hover:text-n-3 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Custom Links Section */}
      <div className="mt-12 p-6 bg-gradient-to-br from-color-1/10 to-color-2/5 border border-color-1/20 rounded-xl">
        <h3 className="font-semibold text-n-1 mb-2">Need to add a resource?</h3>
        <p className="text-sm text-n-3">
          Contact the admin to add new tools or resources to this page. Custom
          links can be added for client-specific tools or internal documentation.
        </p>
      </div>
    </div>
  );
}
