"use client";

import Cal from "@calcom/embed-react";
import { useTranslations } from "next-intl";

interface CalcomBookingProps {
  bundleInterest: boolean;
  locale: string;
}

export function CalcomBooking({ bundleInterest }: CalcomBookingProps) {
  const t = useTranslations("HomePage.contact.success");

  // Determine primary recommendation based on bundle interest
  const primaryCalLink = bundleInterest
    ? "flowko/digital-strategy-45min"
    : "flowko/automation-audit-30min";

  const alternativeCalLink = bundleInterest
    ? "flowko/automation-audit-30min"
    : "flowko/digital-strategy-45min";

  const alternativeDuration = bundleInterest ? "30" : "45";

  return (
    <div className="space-y-6">
      {/* Cal.com Inline Widget */}
      <div className="w-full">
        <Cal
          calLink={primaryCalLink}
          config={{
            theme: "dark",
            layout: "month_view",
          }}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "630px",
          }}
        />
      </div>

      {/* Alternative Duration Link */}
      <div className="text-center">
        <p className="text-sm text-n-4">
          {t("alternativeText")}{" "}
          <a
            href={`https://cal.com/${alternativeCalLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-color-1 hover:text-color-2 underline transition-colors"
          >
            {t("alternativeLink", { duration: alternativeDuration })}
          </a>
        </p>
      </div>
    </div>
  );
}
