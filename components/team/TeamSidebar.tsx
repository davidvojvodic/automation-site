"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Brain,
  Users,
  Zap,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  locale: string;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/team/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Knowledge",
    href: "/team/knowledge",
    icon: Brain,
  },
  {
    name: "Clients",
    href: "/team/clients",
    icon: Users,
  },
  {
    name: "Workflows",
    href: "/team/workflows",
    icon: Zap,
  },
  {
    name: "Resources",
    href: "/team/resources",
    icon: LinkIcon,
  },
];

export function TeamSidebar({
  collapsed,
  onToggleCollapse,
  locale,
}: TeamSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
  };

  if (collapsed) {
    return (
      <div className="w-16 bg-n-8 border-r border-n-6 flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-n-6">
          <div className="w-10 h-10 bg-gradient-to-br from-color-1 to-color-2 rounded-lg flex items-center justify-center shadow-lg shadow-color-1/20">
            <span className="text-white font-bold text-lg">F</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className={cn(
                  "w-full h-10 rounded-lg flex items-center justify-center transition-all",
                  active
                    ? "bg-gradient-to-br from-color-1/20 to-color-2/10 text-color-1"
                    : "text-n-4 hover:bg-n-7 hover:text-n-2"
                )}
                title={item.name}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </nav>

        {/* Expand Button */}
        <div className="p-2 border-t border-n-6">
          <Button
            onClick={onToggleCollapse}
            size="icon"
            variant="ghost"
            className="w-full text-n-4 hover:text-n-1"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-n-8 border-r border-n-6 flex flex-col h-full">
      {/* Logo & Brand */}
      <div className="h-16 flex items-center px-4 border-b border-n-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-color-1 to-color-2 rounded-lg flex items-center justify-center shadow-lg shadow-color-1/20">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-n-1">Flowko</h1>
            <p className="text-xs text-n-4">Team Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={`/${locale}${item.href}`}
              className={cn(
                "w-full h-11 px-3 rounded-lg flex items-center gap-3 transition-all",
                active
                  ? "bg-gradient-to-br from-color-1/20 to-color-2/10 text-n-1 border border-color-1/20"
                  : "text-n-3 hover:bg-n-7 hover:text-n-1"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "text-color-1")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-n-6">
        <Button
          onClick={onToggleCollapse}
          variant="ghost"
          className="w-full justify-start gap-2 text-n-4 hover:text-n-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Collapse</span>
        </Button>
      </div>
    </div>
  );
}
