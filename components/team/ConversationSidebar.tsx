"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquarePlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages?: { count: number }[];
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  loading?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  loading = false,
  collapsed = false,
  onToggleCollapse,
}: ConversationSidebarProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this conversation?")) {
      return;
    }

    setDeletingId(id);
    await onDeleteConversation(id);
    setDeletingId(null);
  };

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

  if (collapsed) {
    return (
      <div className="w-16 bg-n-8 border-r border-n-6 flex flex-col items-center py-6 gap-4">
        <Button
          onClick={onNewConversation}
          size="icon"
          className="bg-gradient-to-br from-color-1 to-color-2 hover:shadow-lg hover:shadow-color-1/30 transition-all"
          disabled={loading}
        >
          <MessageSquarePlus className="w-5 h-5" />
        </Button>

        <div className="flex-1 w-full flex flex-col gap-2 px-2 overflow-y-auto">
          {conversations.slice(0, 5).map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={cn(
                "w-full h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer",
                activeConversationId === conv.id
                  ? "bg-gradient-to-br from-color-1/20 to-color-2/10 text-n-1"
                  : "text-n-4 hover:bg-n-7 hover:text-n-2"
              )}
            >
              <MessageSquare className="w-4 h-4" />
            </div>
          ))}
        </div>

        {onToggleCollapse && (
          <Button
            onClick={onToggleCollapse}
            size="icon"
            variant="ghost"
            className="text-n-4 hover:text-n-1"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-80 bg-n-8 border-r border-n-6 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-n-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-n-1">Conversations</h2>
          {onToggleCollapse && (
            <Button
              onClick={onToggleCollapse}
              size="icon"
              variant="ghost"
              className="text-n-4 hover:text-n-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
        </div>

        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-br from-color-1 to-color-2 hover:shadow-lg hover:shadow-color-1/30 transition-all"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <MessageSquarePlus className="w-4 h-4 mr-2" />
          )}
          New Conversation
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <MessageSquare className="w-12 h-12 text-n-6 mb-3" />
            <p className="text-sm text-n-4">No conversations yet</p>
            <p className="text-xs text-n-5 mt-1">
              Start a new conversation to ask questions
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                className={cn(
                  "w-full p-3 rounded-lg transition-all group relative cursor-pointer",
                  "hover:bg-n-7 hover:-translate-y-0.5",
                  activeConversationId === conversation.id
                    ? "bg-gradient-to-br from-color-1/15 to-color-2/10 border border-color-1/20 shadow-lg shadow-color-1/10"
                    : "bg-n-7/50 border border-n-6"
                )}
                style={{
                  animationDelay: `${300 + index * 50}ms`,
                }}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium truncate mb-1",
                        activeConversationId === conversation.id
                          ? "text-n-1"
                          : "text-n-2"
                      )}
                    >
                      {conversation.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-n-5">
                      <span>{formatDate(conversation.updated_at)}</span>
                      {conversation.messages && conversation.messages[0]?.count > 0 && (
                        <>
                          <span>•</span>
                          <span>{conversation.messages[0].count} messages</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, conversation.id)}
                    className={cn(
                      "opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0",
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      "hover:bg-red-500/10 hover:text-red-400 text-n-5"
                    )}
                    disabled={deletingId === conversation.id}
                  >
                    {deletingId === conversation.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
