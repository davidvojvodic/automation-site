"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { createClient } from "@/lib/knowledge/supabase";
import { TeamSidebar } from "./TeamSidebar";
import { TeamHeader } from "./TeamHeader";
import { Brain, Loader2 } from "lucide-react";

interface TeamPortalLayoutProps {
  children: ReactNode;
}

export function TeamPortalLayout({ children }: TeamPortalLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if on login page
  const isLoginPage = pathname.includes("/team/login");

  useEffect(() => {
    // Skip auth check for login page
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push(`/${locale}/team/login`);
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push(`/${locale}/team/login`);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, locale, isLoginPage]);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("teamSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  // Save sidebar state
  const handleToggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("teamSidebarCollapsed", String(newState));
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-n-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-color-1 to-color-2 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-color-1/20">
            <Brain className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 text-n-3">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Render login page without layout wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-n-8">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <TeamSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          locale={locale}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="fixed inset-y-0 left-0 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <TeamSidebar
              collapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
              locale={locale}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TeamHeader
          user={user}
          onMenuClick={() => setMobileMenuOpen(true)}
          showMenuButton={true}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
