"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Brain,
  Users,
  Zap,
  LinkIcon,
  MessageSquare,
  ArrowRight,
  Clock,
  Activity,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface DashboardStats {
  totalConversations: number;
  totalClients: number;
  totalWorkflows: number;
  recentConversations: Conversation[];
}

const quickActions = [
  {
    name: "New Chat",
    description: "Ask the knowledge base",
    href: "/team/knowledge",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Clients",
    description: "Manage client projects",
    href: "/team/clients",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Workflows",
    description: "Browse automation library",
    href: "/team/workflows",
    icon: Zap,
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    name: "Resources",
    description: "Tools & quick links",
    href: "/team/resources",
    icon: LinkIcon,
    gradient: "from-green-500 to-emerald-500",
  },
];

const externalTools = [
  { name: "n8n", url: "https://n8n.flowko.io", icon: "⚡" },
  { name: "Supabase", url: "https://supabase.com/dashboard", icon: "🗄️" },
  { name: "GitHub", url: "https://github.com", icon: "🐙" },
  { name: "Email", url: "https://mail.google.com", icon: "📧" },
];

export default function DashboardPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [stats, setStats] = useState<DashboardStats>({
    totalConversations: 0,
    totalClients: 0,
    totalWorkflows: 0,
    recentConversations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Load conversations for stats
        const response = await fetch("/api/conversations");
        if (response.ok) {
          const data = await response.json();
          const conversations = data.conversations || [];
          setStats({
            totalConversations: conversations.length,
            totalClients: 0, // Will be updated when clients API is ready
            totalWorkflows: 0, // Will be updated when workflows API is ready
            recentConversations: conversations.slice(0, 5),
          });
        }
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-n-1 mb-2">
          {getGreeting()}! 👋
        </h1>
        <p className="text-n-3">
          Welcome to the Flowko Team Portal. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-n-1 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={`/${locale}${action.href}`}
                className="group p-4 bg-n-7 border border-n-6 rounded-xl hover:border-n-5 hover:-translate-y-1 transition-all"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
                    action.gradient
                  )}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-n-1 mb-1 group-hover:text-color-1 transition-colors">
                  {action.name}
                </h3>
                <p className="text-sm text-n-4">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-n-1 mb-4">Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-n-7 border border-n-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-n-1">
                {loading ? "-" : stats.totalConversations}
              </p>
              <p className="text-sm text-n-4">Conversations</p>
            </div>

            <div className="p-4 bg-n-7 border border-n-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-n-1">
                {loading ? "-" : stats.totalClients}
              </p>
              <p className="text-sm text-n-4">Clients</p>
            </div>

            <div className="p-4 bg-n-7 border border-n-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-n-1">
                {loading ? "-" : stats.totalWorkflows}
              </p>
              <p className="text-sm text-n-4">Workflows</p>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="bg-n-7 border border-n-6 rounded-xl">
            <div className="p-4 border-b border-n-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-n-4" />
                <h3 className="font-semibold text-n-1">Recent Conversations</h3>
              </div>
              <Link
                href={`/${locale}/team/knowledge`}
                className="text-sm text-color-1 hover:text-color-2 flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-n-6">
              {loading ? (
                <div className="p-8 text-center text-n-4">Loading...</div>
              ) : stats.recentConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-8 h-8 text-n-5 mx-auto mb-2" />
                  <p className="text-n-4">No conversations yet</p>
                  <Link
                    href={`/${locale}/team/knowledge`}
                    className="text-sm text-color-1 hover:text-color-2 mt-2 inline-block"
                  >
                    Start your first conversation
                  </Link>
                </div>
              ) : (
                stats.recentConversations.map((conv) => (
                  <Link
                    key={conv.id}
                    href={`/${locale}/team/knowledge`}
                    className="p-4 flex items-center justify-between hover:bg-n-6/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-n-6 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-n-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-n-1 line-clamp-1">
                          {conv.title}
                        </p>
                        <p className="text-xs text-n-4">
                          {formatDate(conv.updated_at)}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-n-5" />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-n-7 border border-n-6 rounded-xl">
            <div className="p-4 border-b border-n-6">
              <h3 className="font-semibold text-n-1 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-n-4" />
                External Tools
              </h3>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {externalTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-n-6/50 rounded-lg hover:bg-n-6 transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="text-sm text-n-2">{tool.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-n-7 border border-n-6 rounded-xl">
            <div className="p-4 border-b border-n-6">
              <h3 className="font-semibold text-n-1 flex items-center gap-2">
                <Activity className="w-4 h-4 text-n-4" />
                System Status
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-3">Knowledge Base</span>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-3">n8n Workflows</span>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Running
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-3">Database</span>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Connected
                </span>
              </div>
            </div>
          </div>

          {/* Tip of the Day */}
          <div className="bg-gradient-to-br from-color-1/10 to-color-2/5 border border-color-1/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-color-1" />
              <h3 className="font-semibold text-n-1">Tip</h3>
            </div>
            <p className="text-sm text-n-3">
              Use the Knowledge Chat to quickly find information about pricing,
              processes, and client handling procedures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
