"use client";

import { useState, useEffect } from "react";
import { ConversationSidebar } from "./ConversationSidebar";
import { KnowledgeChat } from "./KnowledgeChat";
import { useRouter } from "next/navigation";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages?: { count: number }[];
}

export function KnowledgeChatLayout() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load active conversation from localStorage
  useEffect(() => {
    const savedConversationId = localStorage.getItem("activeConversationId");
    if (savedConversationId && conversations.some((c) => c.id === savedConversationId)) {
      setActiveConversationId(savedConversationId);
    } else if (conversations.length > 0) {
      // Select most recent conversation
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations]);

  // Save active conversation to localStorage
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem("activeConversationId", activeConversationId);
    }
  }, [activeConversationId]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/conversations");

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load conversations");
      }

      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Conversation" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create conversation");
      }

      const data = await response.json();
      const newConversation = data.conversation;

      setConversations([newConversation, ...conversations]);
      setActiveConversationId(newConversation.id);
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Failed to create new conversation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete conversation");
      }

      // Remove from state
      setConversations(conversations.filter((c) => c.id !== id));

      // If deleted conversation was active, select another
      if (activeConversationId === id) {
        const remaining = conversations.filter((c) => c.id !== id);
        setActiveConversationId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      alert("Failed to delete conversation. Please try again.");
    }
  };

  const handleConversationUpdate = () => {
    // Reload conversations to update titles and message counts
    loadConversations();
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-n-8">
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        loading={loading}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 overflow-hidden">
        {activeConversationId ? (
          <KnowledgeChat
            conversationId={activeConversationId}
            onConversationUpdate={handleConversationUpdate}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-color-1/20 to-color-2/10 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-color-1/20">
                <svg
                  className="w-10 h-10 text-color-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-n-1 mb-3">
                Welcome to Flowko Knowledge
              </h2>
              <p className="text-n-3 mb-8">
                Ask questions about our services, pricing, processes, and business
                knowledge. Start a new conversation to begin.
              </p>

              <button
                onClick={handleNewConversation}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-br from-color-1 to-color-2 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-color-1/30 transition-all disabled:opacity-50"
              >
                {loading ? "Creating..." : "Start New Conversation"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
