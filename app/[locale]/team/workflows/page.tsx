"use client";

import { useState } from "react";
import {
  Zap,
  ExternalLink,
  Search,
  Filter,
  Mail,
  Users,
  MessageSquare,
  Database,
  FileText,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Workflow {
  id: string;
  name: string;
  description: string;
  category: "lead-gen" | "email" | "crm" | "support" | "internal" | "integration";
  type: "template" | "client";
  client?: string;
  status: "active" | "draft" | "disabled";
  n8nUrl: string;
  lastRun?: string;
  nodes: string[];
}

// Static workflow data - will be replaced with DB later
const workflows: Workflow[] = [
  {
    id: "1",
    name: "Lead Capture to CRM",
    description: "Captures leads from website forms and adds them to CRM with enrichment",
    category: "lead-gen",
    type: "template",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/1",
    lastRun: "2 hours ago",
    nodes: ["Webhook", "HTTP Request", "IF", "Airtable"],
  },
  {
    id: "2",
    name: "Email Welcome Sequence",
    description: "Automated welcome email series for new subscribers",
    category: "email",
    type: "template",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/2",
    lastRun: "1 hour ago",
    nodes: ["Webhook", "Wait", "Send Email", "IF"],
  },
  {
    id: "3",
    name: "Support Ticket Router",
    description: "Routes incoming support tickets based on keywords and priority",
    category: "support",
    type: "template",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/3",
    lastRun: "30 minutes ago",
    nodes: ["Email Trigger", "OpenAI", "Slack", "Notion"],
  },
  {
    id: "4",
    name: "Invoice Generator",
    description: "Generates and sends invoices automatically from project milestones",
    category: "internal",
    type: "template",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/4",
    lastRun: "1 day ago",
    nodes: ["Schedule", "Airtable", "PDF Generator", "Email"],
  },
  {
    id: "5",
    name: "Social Media Scheduler",
    description: "Schedules and posts content across multiple social platforms",
    category: "integration",
    type: "template",
    status: "draft",
    n8nUrl: "https://n8n.flowko.io/workflow/5",
    nodes: ["Schedule", "Notion", "Twitter", "LinkedIn"],
  },
  {
    id: "6",
    name: "Client A - Lead Sync",
    description: "Custom lead synchronization workflow for Client A",
    category: "lead-gen",
    type: "client",
    client: "Client A",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/6",
    lastRun: "4 hours ago",
    nodes: ["Webhook", "Salesforce", "Slack"],
  },
  {
    id: "7",
    name: "Client B - Support Bot",
    description: "AI-powered support chatbot for Client B website",
    category: "support",
    type: "client",
    client: "Client B",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/7",
    lastRun: "15 minutes ago",
    nodes: ["Webhook", "OpenAI", "HTTP Request"],
  },
  {
    id: "8",
    name: "Database Backup",
    description: "Automated daily backup of critical databases",
    category: "internal",
    type: "template",
    status: "active",
    n8nUrl: "https://n8n.flowko.io/workflow/8",
    lastRun: "6 hours ago",
    nodes: ["Schedule", "Postgres", "S3", "Slack"],
  },
];

const categories = [
  { id: "all", name: "All Workflows", icon: Zap },
  { id: "template", name: "Templates", icon: FileText },
  { id: "client", name: "Client Workflows", icon: Users },
  { id: "lead-gen", name: "Lead Generation", icon: Users },
  { id: "email", name: "Email", icon: Mail },
  { id: "support", name: "Support", icon: MessageSquare },
  { id: "internal", name: "Internal", icon: Database },
  { id: "integration", name: "Integrations", icon: Globe },
];

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    icon: CheckCircle2,
  },
  draft: {
    label: "Draft",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    icon: Clock,
  },
  disabled: {
    label: "Disabled",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: AlertCircle,
  },
};

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      activeCategory === workflow.type ||
      activeCategory === workflow.category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-n-1 mb-2">
          Workflow Library
        </h1>
        <p className="text-n-3">
          Browse and manage your n8n automation workflows.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-n-4" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
          />
        </div>
        <Button variant="outline" className="gap-2 border-n-6 text-n-3">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-n-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                isActive
                  ? "bg-color-1/10 text-color-1 border border-color-1/20"
                  : "bg-n-7 text-n-3 border border-n-6 hover:border-n-5 hover:text-n-1"
              )}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Workflow Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkflows.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <Zap className="w-12 h-12 text-n-5 mx-auto mb-3" />
            <p className="text-n-3">No workflows found</p>
            <p className="text-sm text-n-4 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredWorkflows.map((workflow) => {
            const status = statusConfig[workflow.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={workflow.id}
                className="p-4 bg-n-7 border border-n-6 rounded-xl hover:border-n-5 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-color-1 to-color-2 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-n-1 group-hover:text-color-1 transition-colors line-clamp-1">
                        {workflow.name}
                      </h3>
                      {workflow.client && (
                        <p className="text-xs text-n-4">{workflow.client}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-md text-xs font-medium border flex items-center gap-1",
                      status.color
                    )}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-n-3 mb-4 line-clamp-2">
                  {workflow.description}
                </p>

                {/* Nodes */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {workflow.nodes.slice(0, 4).map((node) => (
                    <span
                      key={node}
                      className="px-2 py-0.5 bg-n-6 rounded text-xs text-n-3"
                    >
                      {node}
                    </span>
                  ))}
                  {workflow.nodes.length > 4 && (
                    <span className="px-2 py-0.5 bg-n-6 rounded text-xs text-n-4">
                      +{workflow.nodes.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-n-6">
                  {workflow.lastRun ? (
                    <div className="flex items-center gap-1 text-xs text-n-4">
                      <Play className="w-3 h-3" />
                      <span>Last run: {workflow.lastRun}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-n-5">Never run</span>
                  )}
                  <a
                    href={workflow.n8nUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-color-1 hover:text-color-2 transition-colors"
                  >
                    Open
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Workflow CTA */}
      <div className="mt-8 p-6 bg-gradient-to-br from-color-1/10 to-color-2/5 border border-color-1/20 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-n-1 mb-1">Create New Workflow</h3>
          <p className="text-sm text-n-3">
            Build a new automation directly in n8n
          </p>
        </div>
        <a
          href="https://n8n.flowko.io/workflow/new"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-br from-color-1 to-color-2 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-color-1/30 transition-all flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Create in n8n
        </a>
      </div>
    </div>
  );
}
