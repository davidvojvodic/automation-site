"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/knowledge/supabase";
import { Button } from "@/components/ui/button";
import { LogOut, User, Brain } from "lucide-react";
import { KnowledgeChatLayout } from "@/components/team/KnowledgeChatLayout";

export default function KnowledgePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/en/team/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-n-8">
        <div className="text-center">
          <Brain className="w-12 h-12 text-color-1 animate-pulse mx-auto mb-4" />
          <p className="text-n-3">Loading knowledge base...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-n-8">
      {/* Header */}
      <div className="border-b border-n-6 bg-n-8">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-color-1 to-color-2 rounded-lg flex items-center justify-center shadow-lg shadow-color-1/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-n-1">
                  Flowko Knowledge Base
                </h1>
                <p className="text-xs text-n-3">AI-powered business intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-n-7 border border-n-6 rounded-lg">
                <User className="w-4 h-4 text-n-4" />
                <span className="text-sm text-n-3">{user?.email}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="gap-2 text-n-3 hover:text-n-1 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Layout with Sidebar */}
      <KnowledgeChatLayout />
    </div>
  );
}
