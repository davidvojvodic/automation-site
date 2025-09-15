"use client";

import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import {
  Workflow,
  Bot,
  Target,
  Zap,
  TrendingUp,
  Building2,
  Mic,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface AIServicesProps {
  className?: string;
}

// Icon mapping for the automation systems
const iconMap = {
  Search,
  TrendingUp,
  Target,
  Bot,
  Mic,
  Zap,
} as const;

type IconName = keyof typeof iconMap;

const AIServices = ({ className }: AIServicesProps) => {
  const t = useTranslations("HomePage.aiServices");
  const locale = useLocale();

  // Flowko Automation Systems - Standard services first, then Premium/Enterprise
  const automationSystems = [
    {
      id: "lead-generation",
      icon: "Search" as IconName,
      title: t("leadGeneration.title"),
      subtitle: t("leadGeneration.subtitle"),
      description: t("leadGeneration.description"),
      outcome: t("leadGeneration.outcome"),
      capabilities: [
        t("leadGeneration.capabilities.0"),
        t("leadGeneration.capabilities.1"),
        t("leadGeneration.capabilities.2"),
        t("leadGeneration.capabilities.3"),
        t("leadGeneration.capabilities.4"),
      ],
      badge: t("leadGeneration.badge"),
      techStack: ["n8n", "OpenAI GPT-4", "LinkedIn API", "HubSpot"],
      applications: [
        "B2B prospecting",
        "Lead qualification",
        "Sales outreach",
        "CRM integration",
      ],
      popular: true,
    },
    {
      id: "sales-automation",
      icon: "TrendingUp" as IconName,
      title: t("salesAutomation.title"),
      subtitle: t("salesAutomation.subtitle"),
      description: t("salesAutomation.description"),
      outcome: t("salesAutomation.outcome"),
      capabilities: [
        t("salesAutomation.capabilities.0"),
        t("salesAutomation.capabilities.1"),
        t("salesAutomation.capabilities.2"),
        t("salesAutomation.capabilities.3"),
        t("salesAutomation.capabilities.4"),
      ],
      badge: t("salesAutomation.badge"),
      techStack: ["n8n", "Claude 3", "Salesforce API", "DocuSign"],
      applications: [
        "Proposal automation",
        "Pipeline management",
        "CRM workflows",
        "Sales analytics",
      ],
      popular: false,
    },
    {
      id: "recruitment-automation",
      icon: "Bot" as IconName,
      title: t("recruitment.title"),
      subtitle: t("recruitment.subtitle"),
      description: t("recruitment.description"),
      outcome: t("recruitment.outcome"),
      capabilities: [
        t("recruitment.capabilities.0"),
        t("recruitment.capabilities.1"),
        t("recruitment.capabilities.2"),
        t("recruitment.capabilities.3"),
        t("recruitment.capabilities.4"),
      ],
      badge: t("recruitment.badge"),
      techStack: ["n8n", "OpenAI GPT-4", "LinkedIn API", "ATS Integration"],
      applications: [
        "CV processing automation",
        "Candidate scoring systems",
        "Interview scheduling",
        "Multi-platform recruitment",
      ],
      popular: false,
    },
    {
      id: "voice-ai-agents",
      icon: "Mic" as IconName,
      title: t("voiceAI.title"),
      subtitle: t("voiceAI.subtitle"),
      description: t("voiceAI.description"),
      outcome: t("voiceAI.outcome"),
      capabilities: [
        t("voiceAI.capabilities.0"),
        t("voiceAI.capabilities.1"),
        t("voiceAI.capabilities.2"),
        t("voiceAI.capabilities.3"),
        t("voiceAI.capabilities.4"),
      ],
      badge: t("voiceAI.badge"),
      techStack: ["n8n", "Voice AI APIs", "Speech Recognition", "Calendly"],
      applications: [
        "Customer service",
        "Appointment booking",
        "Sales calls",
        "Support tickets",
      ],
      isPremium: true,
      popular: false,
    },
    {
      id: "ai-content-systems",
      icon: "Target" as IconName,
      title: t("contentSystems.title"),
      subtitle: t("contentSystems.subtitle"),
      description: t("contentSystems.description"),
      outcome: t("contentSystems.outcome"),
      capabilities: [
        t("contentSystems.capabilities.0"),
        t("contentSystems.capabilities.1"),
        t("contentSystems.capabilities.2"),
        t("contentSystems.capabilities.3"),
        t("contentSystems.capabilities.4"),
      ],
      badge: t("contentSystems.badge"),
      techStack: ["n8n", "OpenAI GPT-4", "DALL-E 3", "Buffer API"],
      applications: [
        "Content creation",
        "Social media",
        "SEO optimization",
        "Brand management",
      ],
      isPremium: true,
      popular: false,
    },
    {
      id: "automation-dashboard",
      icon: "Zap" as IconName,
      title: t("automationDashboard.title"),
      subtitle: t("automationDashboard.subtitle"),
      description: t("automationDashboard.description"),
      outcome: t("automationDashboard.outcome"),
      capabilities: [
        t("automationDashboard.capabilities.0"),
        t("automationDashboard.capabilities.1"),
        t("automationDashboard.capabilities.2"),
        t("automationDashboard.capabilities.3"),
        t("automationDashboard.capabilities.4"),
      ],
      badge: t("automationDashboard.badge"),
      techStack: ["n8n", "React/Next.js", "Node.js", "Database", "APIs"],
      applications: [
        "Automation monitoring",
        "Business analytics",
        "Workflow control",
        "Performance tracking",
      ],
      isEnterprise: true,
      popular: false,
    },
  ];

  // Generate structured data for services
  const generateServiceStructuredData = () => {
    const services = automationSystems.map((system) => ({
      "@type": "Service",
      "@id": `https://flowko.io/${locale}#${system.id}`,
      name: system.title,
      description: system.description,
      serviceOutput: system.outcome,
      provider: {
        "@type": "Organization",
        name: "Flowko",
        url: "https://flowko.io"
      },
      serviceType: locale === "sl" ? "Avtomatizacija poslovnih procesov" : "Business Process Automation",
      category: system.badge,
      keywords: system.techStack.join(", "),
      areaServed: [
        {
          "@type": "Country",
          name: locale === "sl" ? "Slovenija" : "Slovenia"
        },
        {
          "@type": "Country",
          name: locale === "sl" ? "Avstrija" : "Austria"
        },
        {
          "@type": "Country",
          name: locale === "sl" ? "Hrvaška" : "Croatia"
        }
      ],
      offers: {
        "@type": "Offer",
        description: system.subtitle,
        category: system.isPremium ? "Premium" : system.isEnterprise ? "Enterprise" : "Standard"
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: locale === "sl" ? "AI Avtomatizacijski sistemi" : "AI Automation Systems",
      description: locale === "sl"
        ? "Celovite rešitve za avtomatizacijo poslovnih procesov z AI tehnologijo"
        : "Comprehensive AI-powered business process automation solutions",
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: service
      }))
    };
  };

  return (
    <Section crosses className={cn("", className)} id="ai-services">
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceStructuredData())
        }}
      />
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading
            title={t("title")}
            text={t("subtitle")}
          />
        </div>

        {/* Value Proposition Pills */}
        <div
          className="flex justify-center mb-8 sm:mb-12 lg:mb-16 animate-bundle-benefits"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative max-w-4xl text-center">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-8">
              {[
                { icon: Workflow, text: t("valueProps.visualWorkflow") },
                { icon: TrendingUp, text: t("valueProps.multiSystem") },
                { icon: Building2, text: t("valueProps.enterpriseScale") },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-n-7 rounded-xl sm:rounded-2xl hover:bg-n-6 hover:scale-105 transition-all duration-300 animate-bundle-pill"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-color-1 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-n-1 whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Automation Systems Grid - 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {automationSystems.map((system, index) => {
            const IconComponent = iconMap[system.icon];

            return (
              <div
                key={system.id}
                className={cn(
                  "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                  "hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/10",
                  "hover:-translate-y-1",
                  "transition-all duration-500 ease-out group",
                  "animate-bundle-card",
                  system.popular &&
                    "border-color-1/50 bg-gradient-to-br from-color-1/5 to-transparent hover:from-color-1/10",
                  system.isPremium &&
                    "border-color-6/50 bg-gradient-to-br from-color-6/5 to-transparent hover:from-color-6/10",
                  system.isEnterprise &&
                    "border-color-4/50 bg-gradient-to-br from-color-4/5 to-transparent hover:from-color-4/10"
                )}
                style={{ animationDelay: `${700 + index * 150}ms` }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with Icon, Badge, and Title */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                            system.isPremium && "bg-color-6/10",
                            system.isEnterprise && "bg-color-4/10"
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "w-6 sm:w-7 h-6 sm:h-7 text-color-1",
                              system.isPremium && "text-color-6",
                              system.isEnterprise && "text-color-4"
                            )}
                          />
                        </div>
                      </div>

                      {/* Badge */}
                      <div
                        className={cn(
                          "px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                          system.popular && "bg-color-1 text-n-8",
                          system.isPremium && "bg-color-6 text-n-8",
                          system.isEnterprise && "bg-color-4 text-n-8",
                          !system.popular &&
                            !system.isPremium &&
                            !system.isEnterprise &&
                            "bg-n-6 text-n-3"
                        )}
                      >
                        {system.badge}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-n-1 mb-2 group-hover:text-color-1 transition-colors duration-300">
                        {system.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-color-1 font-medium mb-3">
                        {system.subtitle}
                      </p>
                      <p className="text-sm text-n-4 group-hover:text-n-3 transition-colors duration-300 leading-relaxed">
                        {system.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Capabilities */}
                  <div className="mb-4 flex-1">
                    <h4 className="text-xs font-bold text-n-1 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Workflow className="w-3 h-3 text-color-1" />
                      {t("labels.keyCapabilities")}
                    </h4>
                    <div className="space-y-1">
                      {system.capabilities.map(
                        (capability: string, capIndex: number) => (
                          <div
                            key={capIndex}
                            className="flex items-start gap-2 text-xs"
                          >
                            <div className="w-1.5 h-1.5 bg-color-1 rounded-full flex-shrink-0 mt-1.5"></div>
                            <span className="text-n-2 leading-relaxed">
                              {capability}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Implementation Outcome */}
                  <div className="mt-auto">
                    <div
                      className={cn(
                        "p-3 rounded-lg border-l-4 bg-gradient-to-r",
                        system.isPremium
                          ? "border-color-6 from-color-6/10 to-transparent"
                          : system.isEnterprise
                          ? "border-color-4 from-color-4/10 to-transparent"
                          : "border-color-1 from-color-1/10 to-transparent"
                      )}
                    >
                      <p className="text-xs font-bold text-n-1 mb-1">
                        {t("labels.systemOutcome")}
                      </p>
                      <p
                        className={cn(
                          "text-sm font-bold",
                          system.isPremium
                            ? "text-color-6"
                            : system.isEnterprise
                            ? "text-color-4"
                            : "text-color-1"
                        )}
                      >
                        {system.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                <div
                  className={cn(
                    "absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-all duration-500",
                    system.isPremium
                      ? "from-color-6/10 group-hover:from-color-6/20"
                      : system.isEnterprise
                      ? "from-color-4/10 group-hover:from-color-4/20"
                      : "from-color-1/10 group-hover:from-color-1/20"
                  )}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-12 sm:mt-16 lg:mt-20 animate-bundle-bottom-cta"
          style={{ animationDelay: "1400ms" }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-n-4 mb-6">
              {t("bottomCta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 text-base" href="#contact">
                {t("bottomCta.button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AIServices;
