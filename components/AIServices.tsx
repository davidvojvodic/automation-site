"use client";

import React, { useState } from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import {
  Workflow,
  Bot,
  Sparkles,
  Zap,
  TrendingUp,
  Network,
  Mic,
  Users,
  ChevronDown,
  GitBranch,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

interface AIServicesProps {
  className?: string;
}

// Icon mapping for the automation systems
const iconMap = {
  Users,
  TrendingUp,
  Sparkles,
  Bot,
  Mic,
  Zap,
} as const;

type IconName = keyof typeof iconMap;

const AIServices = ({ className }: AIServicesProps) => {
  const t = useTranslations("HomePage.aiServices");
  const locale = useLocale();

  // Track which system's drawer is open
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  // Track drawer content separately to persist during close animation
  const [drawerContent, setDrawerContent] = useState<string | null>(null);

  // Flowko Automation Systems - Popular services first, then standard services
  const automationSystems = [
    {
      id: "lead-generation",
      icon: "Users" as IconName,
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
      id: "executive-assistant",
      icon: "Bot" as IconName,
      title: t("executiveAssistant.title"),
      subtitle: t("executiveAssistant.subtitle"),
      description: t("executiveAssistant.description"),
      outcome: t("executiveAssistant.outcome"),
      capabilities: [
        t("executiveAssistant.capabilities.0"),
        t("executiveAssistant.capabilities.1"),
        t("executiveAssistant.capabilities.2"),
        t("executiveAssistant.capabilities.3"),
        t("executiveAssistant.capabilities.4"),
        t("executiveAssistant.capabilities.5"),
        t("executiveAssistant.capabilities.6"),
      ],
      badge: t("executiveAssistant.badge"),
      techStack: ["n8n", "OpenAI GPT-4", "Calendar APIs", "Email Integration"],
      applications: [
        "Personal productivity",
        "Schedule management",
        "Communication coordination",
        "Task automation",
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
      id: "customer-support",
      icon: "Mic" as IconName,
      title: t("customerSupport.title"),
      subtitle: t("customerSupport.subtitle"),
      description: t("customerSupport.description"),
      outcome: t("customerSupport.outcome"),
      capabilities: [
        t("customerSupport.capabilities.0"),
        t("customerSupport.capabilities.1"),
        t("customerSupport.capabilities.2"),
        t("customerSupport.capabilities.3"),
        t("customerSupport.capabilities.4"),
        t("customerSupport.capabilities.5"),
        t("customerSupport.capabilities.6"),
      ],
      badge: t("customerSupport.badge"),
      techStack: ["n8n", "Voice AI APIs", "Multi-channel Integration", "CRM"],
      applications: [
        "24/7 Customer support",
        "Multi-channel service",
        "Call routing",
        "Support automation",
      ],
      popular: false,
    },
    {
      id: "marketing-automation",
      icon: "Sparkles" as IconName,
      title: t("marketingAutomation.title"),
      subtitle: t("marketingAutomation.subtitle"),
      description: t("marketingAutomation.description"),
      outcome: t("marketingAutomation.outcome"),
      capabilities: [
        t("marketingAutomation.capabilities.0"),
        t("marketingAutomation.capabilities.1"),
        t("marketingAutomation.capabilities.2"),
        t("marketingAutomation.capabilities.3"),
        t("marketingAutomation.capabilities.4"),
        t("marketingAutomation.capabilities.5"),
        t("marketingAutomation.capabilities.6"),
        t("marketingAutomation.capabilities.7"),
      ],
      badge: t("marketingAutomation.badge"),
      techStack: ["n8n", "OpenAI GPT-4", "Social Media APIs", "Analytics"],
      applications: [
        "Content creation",
        "Campaign management",
        "Social automation",
        "Market research",
      ],
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
        category: "AI Business Automation"
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
        <div className="-mx-5 md:-mx-10 lg:-mx-[3.75rem]">
          <div className="px-5 md:px-10 lg:px-[3.75rem] mb-8 sm:mb-12 lg:mb-16 animate-bundle-benefits" style={{ animationDelay: "300ms" }}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-4 lg:gap-6">
              {[
                { icon: Workflow, text: t("valueProps.visualWorkflow") },
                { icon: GitBranch, text: t("valueProps.multiSystem") },
                { icon: Network, text: t("valueProps.enterpriseScale") },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-n-7 rounded-xl sm:rounded-2xl hover:bg-n-6 hover:scale-105 transition-all duration-300 animate-bundle-pill w-full sm:w-auto"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="w-5 sm:w-5 h-5 sm:h-5 text-color-1 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-n-1 whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Automation Systems Grid - First 6 Systems in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
          {automationSystems.slice(0, 6).map((system, index) => {
            const IconComponent = iconMap[system.icon];

            return (
              <div
                key={system.id}
                onClick={() => {
                  setDrawerContent(system.id);
                  setOpenDrawer(system.id);
                }}
                className={cn(
                  "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                  "cursor-pointer hover:-translate-y-2 hover:scale-[1.02]",
                  "transition-all duration-500 ease-out group",
                  "animate-bundle-card",
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-transparent shadow-xl shadow-color-1/10 hover:from-color-1/10 hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/15"
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
                            "w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-300",
                            "bg-gradient-to-br from-color-1/20 to-color-2/20"
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "w-6 sm:w-7 h-6 sm:h-7",
                              "text-color-1"
                            )}
                          />
                        </div>
                      </div>

                      {/* Badge */}
                      <div
                        className={cn(
                          "px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                          system.popular ? "bg-color-1 text-n-8" : "bg-n-6 text-n-2"
                        )}
                      >
                        {system.badge}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-n-1 mb-2 group-hover:text-color-1 transition-colors duration-300">
                        {system.title}
                      </h3>
                      <p className="text-sm text-color-1 font-medium mb-2">
                        {system.subtitle}
                      </p>
                      <p className="text-sm text-n-4 group-hover:text-n-3 transition-colors duration-300 leading-relaxed line-clamp-2">
                        {system.description}
                      </p>
                    </div>
                  </div>

                  {/* Click Hint */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-center gap-2 text-xs text-n-4 group-hover:text-n-2 transition-colors duration-300">
                      <span className="font-medium">{t("labels.clickToExplore")}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-color-1/15 via-color-2/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 group-hover:from-color-1/25 group-hover:via-color-2/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-color-2/10 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Enterprise System - Full Width Card */}
        {automationSystems.slice(6).map((system) => {
          const IconComponent = iconMap[system.icon];

          return (
            <div key={system.id} className="mt-6 sm:mt-12 lg:mt-16 max-w-7xl mx-auto">
              <div
                className={cn(
                  "relative p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl overflow-hidden",
                  "bg-gradient-to-br from-color-1/10 via-color-2/5 to-transparent",
                  "border-2 border-color-1/60 hover:border-color-1/80",
                  "shadow-2xl shadow-color-1/20 hover:shadow-3xl hover:shadow-color-1/30",
                  "transition-all duration-500 ease-out group",
                  "animate-bundle-card"
                )}
                style={{ animationDelay: "1600ms" }}
              >
                {/* Content Wrapper */}
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Left Side - Icon & Title */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-color-1/20 to-color-2/20 flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                          <IconComponent className="w-7 h-7 sm:w-10 sm:h-10 text-color-1" />
                        </div>

                        {/* Enterprise Badge */}
                        <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-color-1 to-color-2 text-n-8 text-sm font-bold uppercase tracking-wider shadow-lg">
                          {system.badge}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-n-1 mb-3 group-hover:text-color-1 transition-colors duration-300">
                        {system.title}
                      </h3>
                      <p className="text-sm sm:text-lg text-color-1 font-medium mb-3">
                        {system.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-n-3 leading-relaxed max-w-3xl line-clamp-2">
                        {system.description}
                      </p>
                    </div>
                  </div>

                  {/* View Full Details Button */}
                  <div>
                    <button
                      onClick={() => {
                        setDrawerContent(system.id);
                        setOpenDrawer(system.id);
                      }}
                      className={cn(
                        "w-full sm:w-auto px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl",
                        "bg-gradient-to-r from-color-1 to-color-2",
                        "text-n-8 font-bold text-sm sm:text-base",
                        "hover:shadow-2xl hover:shadow-color-1/40 hover:-translate-y-1",
                        "transition-all duration-300",
                        "flex items-center justify-center gap-2 sm:gap-3"
                      )}
                    >
                      <Workflow className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t("labels.viewEnterpriseCapabilities")}</span>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 -rotate-90" />
                    </button>
                  </div>
                </div>

                {/* Background Decorations - Multiple Gradient Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-color-1/15 to-transparent rounded-full -translate-y-32 translate-x-32 group-hover:scale-125 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-color-2/15 to-transparent rounded-full translate-y-32 -translate-x-32 group-hover:scale-125 transition-all duration-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-color-1/5 via-color-2/5 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-all duration-1000"></div>
              </div>
            </div>
          );
        })}

        {/* Drawer for System Details */}
        <Drawer
          open={!!openDrawer}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setOpenDrawer(null);
              setTimeout(() => setDrawerContent(null), 300);
            }
          }}
          direction="right"
        >
          <DrawerContent className="bg-n-8 border-l border-n-6 flex flex-col">
            {drawerContent && (() => {
              const selectedSystem = automationSystems.find(s => s.id === drawerContent);
              if (!selectedSystem) return null;

              const IconComponent = iconMap[selectedSystem.icon];

              return (
                <>
                  {/* Close Button - Fixed position */}
                  <DrawerClose className="absolute top-4 right-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-4 w-4 text-n-3" />
                    <span className="sr-only">Close</span>
                  </DrawerClose>

                  {/* Scrollable content wrapper with webkit touch scrolling for iOS */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <DrawerHeader className="relative border-b border-n-6/50 pb-4">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                            "bg-color-1/10"
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "w-7 h-7",
                              "text-color-1"
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <div
                            className={cn(
                              "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2",
                              selectedSystem.popular ? "bg-color-1 text-n-8" : "bg-n-6 text-n-2"
                            )}
                          >
                            {selectedSystem.badge}
                          </div>
                        </div>
                      </div>
                      <DrawerTitle className="text-2xl font-bold text-n-1">
                        {selectedSystem.title}
                      </DrawerTitle>
                      <DrawerDescription className="text-base text-color-1 font-medium mt-2">
                        {selectedSystem.subtitle}
                      </DrawerDescription>
                      <p className="text-sm text-n-4 mt-3 leading-relaxed">
                        {selectedSystem.description}
                      </p>
                    </DrawerHeader>

                    <div className="space-y-6 py-6 px-4">
                      {/* Capabilities */}
                      <div>
                      <h4 className="text-sm font-bold text-n-1 uppercase tracking-wider flex items-center gap-2 mb-4">
                        <Workflow className="w-4 h-4 text-color-1" />
                        {t("labels.keyCapabilities")}
                      </h4>
                      <div className="space-y-3">
                        {selectedSystem.capabilities.map((capability: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div
                              className={cn(
                                "w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2",
                                "bg-color-1"
                              )}
                            />
                            <span className="text-sm text-n-2 leading-relaxed">
                              {capability}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typical Results */}
                    <div className="border-t border-n-6/50 pt-6">
                      <h4 className="text-sm font-bold text-n-1 uppercase tracking-wider mb-3">
                        {t("labels.systemOutcome")}
                      </h4>
                      <p
                        className={cn(
                          "text-base font-semibold leading-relaxed",
                          "text-color-1"
                        )}
                      >
                        {selectedSystem.outcome}
                      </p>
                    </div>

                    {/* Applications */}
                    <div className="border-t border-n-6/50 pt-6">
                      <h4 className="text-sm font-bold text-n-1 uppercase tracking-wider mb-3">
                        {t("labels.useCases")}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSystem.applications.map((app: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-n-2"
                          >
                            <div className="w-1 h-1 bg-color-1 rounded-full flex-shrink-0" />
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="border-t border-n-6/50 pt-6 flex justify-center">
                      <Button
                        href="#contact"
                        onClick={() => setOpenDrawer(null)}
                      >
                        {t("bottomCta.button")}
                      </Button>
                    </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </DrawerContent>
        </Drawer>
      </div>
    </Section>
  );
};

export default AIServices;
