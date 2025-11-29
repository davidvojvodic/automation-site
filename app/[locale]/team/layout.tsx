import { ReactNode } from "react";
import { TeamPortalLayout } from "@/components/team/TeamPortalLayout";

export default function TeamLayout({ children }: { children: ReactNode }) {
  return <TeamPortalLayout>{children}</TeamPortalLayout>;
}
