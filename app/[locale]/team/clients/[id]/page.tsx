"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  Zap,
  ExternalLink,
  Edit,
  MoreVertical,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  status: "active" | "onboarding" | "maintenance" | "completed";
  projectType: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  startDate: string;
  description: string;
  notes?: string;
  workflows: {
    id: string;
    name: string;
    status: "active" | "draft" | "disabled";
    lastRun?: string;
  }[];
  activities: {
    id: string;
    type: "note" | "workflow" | "status" | "meeting";
    description: string;
    date: string;
  }[];
}

// Static client data - will be replaced with DB later
const clientsData: Record<string, Client> = {
  "1": {
    id: "1",
    name: "TechStartup Inc",
    status: "active",
    projectType: "Lead Generation",
    contactName: "John Smith",
    contactEmail: "john@techstartup.com",
    contactPhone: "+1 555-123-4567",
    website: "https://techstartup.com",
    startDate: "2024-01-15",
    description:
      "Automated lead capture and CRM integration for their SaaS product. The system captures leads from multiple sources including website forms, chatbot, and landing pages, then enriches the data and syncs to their Salesforce CRM.",
    notes:
      "Client prefers weekly check-ins on Tuesdays. Main priority is reducing manual data entry for their sales team.",
    workflows: [
      { id: "w1", name: "Website Lead Capture", status: "active", lastRun: "2 hours ago" },
      { id: "w2", name: "Lead Enrichment", status: "active", lastRun: "2 hours ago" },
      { id: "w3", name: "CRM Sync", status: "active", lastRun: "1 hour ago" },
      { id: "w4", name: "Lead Scoring", status: "draft" },
    ],
    activities: [
      { id: "a1", type: "workflow", description: "Lead Capture workflow updated with new fields", date: "2024-03-15" },
      { id: "a2", type: "meeting", description: "Quarterly review meeting - discussed new features", date: "2024-03-10" },
      { id: "a3", type: "note", description: "Client requested integration with LinkedIn Sales Navigator", date: "2024-03-05" },
      { id: "a4", type: "status", description: "Project moved to Active status", date: "2024-01-15" },
    ],
  },
  "2": {
    id: "2",
    name: "RetailCo",
    status: "active",
    projectType: "Customer Support",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@retailco.com",
    startDate: "2024-02-01",
    description:
      "AI-powered support ticket routing and response system that handles incoming customer inquiries and routes them to appropriate teams.",
    workflows: [
      { id: "w1", name: "Ticket Router", status: "active", lastRun: "30 minutes ago" },
      { id: "w2", name: "Auto Response", status: "active", lastRun: "1 hour ago" },
      { id: "w3", name: "Escalation Handler", status: "active", lastRun: "3 hours ago" },
    ],
    activities: [
      { id: "a1", type: "workflow", description: "Added GPT-4 for better ticket classification", date: "2024-03-12" },
      { id: "a2", type: "note", description: "Support volume increased 20% - system handling well", date: "2024-03-08" },
    ],
  },
};

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/10 text-green-400 border-green-500/20", dot: "bg-green-400" },
  onboarding: { label: "Onboarding", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", dot: "bg-yellow-400" },
  maintenance: { label: "Maintenance", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", dot: "bg-blue-400" },
  completed: { label: "Completed", color: "bg-gray-500/10 text-gray-400 border-gray-500/20", dot: "bg-gray-400" },
};

const workflowStatusConfig = {
  active: { icon: CheckCircle2, color: "text-green-400" },
  draft: { icon: Clock, color: "text-yellow-400" },
  disabled: { icon: AlertCircle, color: "text-red-400" },
};

const activityIcons = {
  note: FileText,
  workflow: Zap,
  status: CheckCircle2,
  meeting: MessageSquare,
};

export default function ClientDetailPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const clientId = params.id as string;

  const client = clientsData[clientId];

  if (!client) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-n-5 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-n-1 mb-2">Client not found</h2>
          <p className="text-n-4 mb-4">The client you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href={`/${locale}/team/clients`}
            className="text-color-1 hover:text-color-2"
          >
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[client.status];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link
        href={`/${locale}/team/clients`}
        className="inline-flex items-center gap-2 text-n-3 hover:text-n-1 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-n-7 border border-n-6 rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-n-3" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-n-1">
                {client.name}
              </h1>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border",
                  status.color
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
                {status.label}
              </span>
            </div>
            <p className="text-n-3">{client.projectType}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-n-6 text-n-3">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-n-6 text-n-3">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-n-7 border-n-6">
              <DropdownMenuItem className="text-n-2 hover:bg-n-6 cursor-pointer">
                Archive Client
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                Delete Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="p-6 bg-n-7 border border-n-6 rounded-xl">
            <h2 className="text-lg font-semibold text-n-1 mb-3">Project Overview</h2>
            <p className="text-n-3 leading-relaxed">{client.description}</p>
            {client.notes && (
              <div className="mt-4 p-4 bg-n-6/50 rounded-lg">
                <p className="text-sm text-n-4 mb-1">Notes</p>
                <p className="text-sm text-n-2">{client.notes}</p>
              </div>
            )}
          </div>

          {/* Workflows */}
          <div className="p-6 bg-n-7 border border-n-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-n-1">Workflows</h2>
              <Button size="sm" variant="outline" className="border-n-6 text-n-3">
                Add Workflow
              </Button>
            </div>
            <div className="space-y-3">
              {client.workflows.map((workflow) => {
                const wStatus = workflowStatusConfig[workflow.status];
                const StatusIcon = wStatus.icon;
                return (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-3 bg-n-6/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-color-1/20 to-color-2/10 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-color-1" />
                      </div>
                      <div>
                        <p className="font-medium text-n-1">{workflow.name}</p>
                        {workflow.lastRun && (
                          <p className="text-xs text-n-4">Last run: {workflow.lastRun}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusIcon className={cn("w-4 h-4", wStatus.color)} />
                      <a
                        href="#"
                        className="text-color-1 hover:text-color-2 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="p-6 bg-n-7 border border-n-6 rounded-xl">
            <h2 className="text-lg font-semibold text-n-1 mb-4">Activity</h2>
            <div className="space-y-4">
              {client.activities.map((activity, index) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div key={activity.id} className="flex gap-4">
                    <div className="relative">
                      <div className="w-8 h-8 bg-n-6 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-n-3" />
                      </div>
                      {index < client.activities.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-full bg-n-6" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-n-2">{activity.description}</p>
                      <p className="text-xs text-n-4 mt-1">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="p-6 bg-n-7 border border-n-6 rounded-xl">
            <h2 className="text-lg font-semibold text-n-1 mb-4">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-n-6 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-n-3" />
                </div>
                <div>
                  <p className="font-medium text-n-1">{client.contactName}</p>
                  <p className="text-sm text-n-4">Primary Contact</p>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${client.contactEmail}`}
                  className="flex items-center gap-2 text-sm text-n-3 hover:text-color-1 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {client.contactEmail}
                </a>
                {client.contactPhone && (
                  <a
                    href={`tel:${client.contactPhone}`}
                    className="flex items-center gap-2 text-sm text-n-3 hover:text-color-1 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {client.contactPhone}
                  </a>
                )}
                {client.website && (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-n-3 hover:text-color-1 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    {client.website.replace("https://", "")}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6 bg-n-7 border border-n-6 rounded-xl">
            <h2 className="text-lg font-semibold text-n-1 mb-4">Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-4">Started</span>
                <span className="text-sm text-n-2">{formatDate(client.startDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-4">Project Type</span>
                <span className="text-sm text-n-2">{client.projectType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-4">Workflows</span>
                <span className="text-sm text-n-2">{client.workflows.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-n-4">Status</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border",
                    status.color
                  )}
                >
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 bg-gradient-to-br from-color-1/10 to-color-2/5 border border-color-1/20 rounded-xl">
            <h3 className="font-semibold text-n-1 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-n-6 text-n-2 hover:bg-n-6"
              >
                <MessageSquare className="w-4 h-4" />
                Add Note
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-n-6 text-n-2 hover:bg-n-6"
              >
                <Zap className="w-4 h-4" />
                Create Workflow
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-n-6 text-n-2 hover:bg-n-6"
              >
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
