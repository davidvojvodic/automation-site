"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Building2,
  Mail,
  Calendar,
  ArrowRight,
  LayoutGrid,
  List,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Client {
  id: string;
  name: string;
  logo?: string;
  status: "active" | "onboarding" | "maintenance" | "completed";
  projectType: string;
  contactName: string;
  contactEmail: string;
  startDate: string;
  description: string;
  workflowCount: number;
}

// Static client data - will be replaced with DB later
const clients: Client[] = [
  {
    id: "1",
    name: "TechStartup Inc",
    status: "active",
    projectType: "Lead Generation",
    contactName: "John Smith",
    contactEmail: "john@techstartup.com",
    startDate: "2024-01-15",
    description: "Automated lead capture and CRM integration for SaaS product",
    workflowCount: 4,
  },
  {
    id: "2",
    name: "RetailCo",
    status: "active",
    projectType: "Customer Support",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@retailco.com",
    startDate: "2024-02-01",
    description: "AI-powered support ticket routing and response system",
    workflowCount: 3,
  },
  {
    id: "3",
    name: "FinanceHub",
    status: "onboarding",
    projectType: "Internal Automation",
    contactName: "Michael Brown",
    contactEmail: "michael@financehub.com",
    startDate: "2024-03-10",
    description: "Invoice processing and payment reconciliation automation",
    workflowCount: 1,
  },
  {
    id: "4",
    name: "HealthPlus",
    status: "maintenance",
    projectType: "Marketing Automation",
    contactName: "Emily Davis",
    contactEmail: "emily@healthplus.com",
    startDate: "2023-09-20",
    description: "Email marketing sequences and patient engagement workflows",
    workflowCount: 6,
  },
  {
    id: "5",
    name: "EduLearn",
    status: "completed",
    projectType: "Integration",
    contactName: "David Wilson",
    contactEmail: "david@edulearn.com",
    startDate: "2023-06-01",
    description: "LMS integration with CRM and email marketing platform",
    workflowCount: 2,
  },
  {
    id: "6",
    name: "GreenEnergy",
    status: "active",
    projectType: "Lead Generation",
    contactName: "Lisa Anderson",
    contactEmail: "lisa@greenenergy.com",
    startDate: "2024-02-20",
    description: "Solar panel inquiry capture and qualification system",
    workflowCount: 5,
  },
];

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    dot: "bg-green-400",
  },
  onboarding: {
    label: "Onboarding",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    dot: "bg-yellow-400",
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    dot: "bg-gray-400",
  },
};

const statusFilters = [
  { id: "all", label: "All Clients" },
  { id: "active", label: "Active" },
  { id: "onboarding", label: "Onboarding" },
  { id: "maintenance", label: "Maintenance" },
  { id: "completed", label: "Completed" },
];

export default function ClientsPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.projectType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || client.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-n-1 mb-2">
            Clients
          </h1>
          <p className="text-n-3">
            Manage your client projects and relationships.
          </p>
        </div>
        <Button className="gap-2 bg-gradient-to-br from-color-1 to-color-2 hover:shadow-lg hover:shadow-color-1/30">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-n-4" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "border-n-6",
              viewMode === "grid" ? "bg-n-6 text-n-1" : "text-n-4"
            )}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "border-n-6",
              viewMode === "list" ? "bg-n-6 text-n-1" : "text-n-4"
            )}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-n-6">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeFilter === filter.id
                ? "bg-color-1/10 text-color-1 border border-color-1/20"
                : "bg-n-7 text-n-3 border border-n-6 hover:border-n-5 hover:text-n-1"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Client Grid/List */}
      {filteredClients.length === 0 ? (
        <div className="py-12 text-center">
          <Users className="w-12 h-12 text-n-5 mx-auto mb-3" />
          <p className="text-n-3">No clients found</p>
          <p className="text-sm text-n-4 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const status = statusConfig[client.status];
            return (
              <Link
                key={client.id}
                href={`/${locale}/team/clients/${client.id}`}
                className="p-4 bg-n-7 border border-n-6 rounded-xl hover:border-n-5 hover:-translate-y-1 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-n-6 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-n-3" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-n-1 group-hover:text-color-1 transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-sm text-n-4">{client.projectType}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-3">
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

                {/* Description */}
                <p className="text-sm text-n-3 mb-4 line-clamp-2">
                  {client.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-n-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(client.startDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {client.workflowCount} workflows
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-n-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-n-6 rounded-full flex items-center justify-center">
                      <span className="text-xs text-n-3">
                        {client.contactName.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-n-3">{client.contactName}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-n-5 group-hover:text-color-1 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-n-7 border border-n-6 rounded-xl divide-y divide-n-6">
          {filteredClients.map((client) => {
            const status = statusConfig[client.status];
            return (
              <Link
                key={client.id}
                href={`/${locale}/team/clients/${client.id}`}
                className="flex items-center justify-between p-4 hover:bg-n-6/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-n-6 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-n-3" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-n-1 group-hover:text-color-1 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-n-4">{client.projectType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={cn(
                      "hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border",
                      status.color
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
                    {status.label}
                  </span>
                  <div className="hidden md:flex items-center gap-2 text-sm text-n-4">
                    <Mail className="w-4 h-4" />
                    {client.contactEmail}
                  </div>
                  <ArrowRight className="w-4 h-4 text-n-5 group-hover:text-color-1 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = clients.filter((c) => c.status === key).length;
          return (
            <div
              key={key}
              className="p-4 bg-n-7 border border-n-6 rounded-xl text-center"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border mb-2",
                  config.color
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                {config.label}
              </span>
              <p className="text-2xl font-bold text-n-1">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
