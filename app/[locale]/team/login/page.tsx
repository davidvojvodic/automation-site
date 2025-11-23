"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/knowledge/supabase";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundCircles } from "@/components/design/Hero";
import { Lock, Mail } from "lucide-react";

export default function TeamLogin() {
  const router = useRouter();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/en/team/knowledge");
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      crosses
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container relative z-2" ref={parallaxRef}>
        <BackgroundCircles parallaxRef={parallaxRef} />

        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 border border-n-1/10 rounded-full">
              <p className="tagline text-n-3">Flowko Team Portal</p>
            </div>
            <h1 className="h1 mb-4">Knowledge Base Access</h1>
            <p className="body-2 text-n-3">
              Sign in to access your business intelligence
            </p>
          </div>

          {/* Login Card */}
          <div className="relative p-8 lg:p-10 bg-n-8 border border-n-6 rounded-3xl backdrop-blur-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-n-1 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-n-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="team@flowko.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 bg-n-7 border-n-6 text-n-1 placeholder:text-n-4 h-12 focus:border-color-1 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm text-n-1 font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-n-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 bg-n-7 border-n-6 text-n-1 placeholder:text-n-4 h-12 focus:border-color-1 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-color-1 hover:bg-color-1/90 text-white font-semibold uppercase tracking-wider transition-colors"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Footer Note */}
            <p className="text-center text-n-4 mt-8 text-xs">
              🔒 Access restricted to Flowko team members only
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
