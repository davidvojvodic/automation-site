"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/knowledge/supabase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Menu, Settings, HelpCircle } from "lucide-react";

interface TeamHeaderProps {
  user: { email?: string } | null;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function TeamHeader({ user, onMenuClick, showMenuButton }: TeamHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/en/team/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-n-8 border-b border-n-6 px-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="icon"
            className="lg:hidden text-n-3 hover:text-n-1"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Right side - User Menu */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 py-2 hover:bg-n-7"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-color-1 to-color-2 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden sm:block text-sm text-n-2 max-w-[150px] truncate">
                {user?.email}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-n-7 border-n-6">
            <DropdownMenuLabel className="text-n-3">
              <div className="flex flex-col">
                <span className="text-n-1 font-medium">Account</span>
                <span className="text-xs text-n-4 truncate">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-n-6" />
            <DropdownMenuItem className="text-n-2 hover:bg-n-6 cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n-2 hover:bg-n-6 cursor-pointer">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-n-6" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
