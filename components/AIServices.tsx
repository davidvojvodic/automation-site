"use client";

import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";

import {
  Workflow,
  TrendingUp,
  Network,
  Users,
  GitBranch,
  Check,
  CalendarClock,
  UserSearch,
  Headphones,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface AIServicesProps {
  className?: string;
}

// Icon mapping - each service gets a UNIQUE icon
const iconMap = {
  Users,           // Lead Generation - finding people
  CalendarClock,   // Executive Assistant - time/scheduling
  TrendingUp,      // Sales Automation - growth
  UserSearch,      // Recruitment - finding candidates
  Headphones,      // Customer Support - support/service
  Megaphone,       // Marketing - campaigns/outreach
} as const;

type IconName = keyof typeof iconMap;

const AIServices = ({ className }: AIServicesProps) => {
  const t = useTranslations("HomePage.aiServices");
  const locale = useLocale();

  // All 6 services in unified grid
  const services = [
    {
      id: "lead-generation",
      icon: "Users" as IconName,
      title: t("leadGeneration.title"),
      subtitle: t("leadGeneration.subtitle"),
      outcome: t("leadGeneration.outcomeShort"),
      benefits: [
        t("leadGeneration.benefits.0"),
        t("leadGeneration.benefits.1"),
        t("leadGeneration.benefits.2"),
      ],
      badge: t("leadGeneration.badge"),
      popular: true,
    },
    {
      id: "executive-assistant",
      icon: "CalendarClock" as IconName,
      title: t("executiveAssistant.title"),
      subtitle: t("executiveAssistant.subtitle"),
      outcome: t("executiveAssistant.outcomeShort"),
      benefits: [
        t("executiveAssistant.benefits.0"),
        t("executiveAssistant.benefits.1"),
        t("executiveAssistant.benefits.2"),
      ],
      badge: t("executiveAssistant.badge"),
      popular: true,
    },
    {
      id: "sales-automation",
      icon: "TrendingUp" as IconName,
      title: t("salesAutomation.title"),
      subtitle: t("salesAutomation.subtitle"),
      outcome: t("salesAutomation.outcomeShort"),
      benefits: [
        t("salesAutomation.benefits.0"),
        t("salesAutomation.benefits.1"),
        t("salesAutomation.benefits.2"),
      ],
      badge: t("salesAutomation.badge"),
      popular: false,
    },
    {
      id: "recruitment-automation",
      icon: "UserSearch" as IconName,
      title: t("recruitment.title"),
      subtitle: t("recruitment.subtitle"),
      outcome: t("recruitment.outcomeShort"),
      benefits: [
        t("recruitment.benefits.0"),
        t("recruitment.benefits.1"),
        t("recruitment.benefits.2"),
      ],
      badge: t("recruitment.badge"),
      popular: false,
    },
    {
      id: "customer-support",
      icon: "Headphones" as IconName,
      title: t("customerSupport.title"),
      subtitle: t("customerSupport.subtitle"),
      outcome: t("customerSupport.outcomeShort"),
      benefits: [
        t("customerSupport.benefits.0"),
        t("customerSupport.benefits.1"),
        t("customerSupport.benefits.2"),
      ],
      badge: t("customerSupport.badge"),
      popular: false,
    },
    {
      id: "marketing-automation",
      icon: "Megaphone" as IconName,
      title: t("marketingAutomation.title"),
      subtitle: t("marketingAutomation.subtitle"),
      outcome: t("marketingAutomation.outcomeShort"),
      benefits: [
        t("marketingAutomation.benefits.0"),
        t("marketingAutomation.benefits.1"),
        t("marketingAutomation.benefits.2"),
      ],
      badge: t("marketingAutomation.badge"),
      popular: false,
    },
  ];

  // Generate structured data for services
  const generateServiceStructuredData = () => {
    const serviceData = services.map((system) => ({
      "@type": "Service",
      "@id": `https://flowko.io/${locale}#${system.id}`,
      name: system.title,
      description: system.outcome,
      provider: {
        "@type": "Organization",
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType:
        locale === "sl"
          ? "Avtomatizacija poslovnih procesov"
          : "Business Process Automation",
      category: system.badge,
      areaServed: [
        { "@type": "Country", name: locale === "sl" ? "Slovenija" : "Slovenia" },
        { "@type": "Country", name: locale === "sl" ? "Avstrija" : "Austria" },
        { "@type": "Country", name: locale === "sl" ? "Hrvaška" : "Croatia" },
      ],
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: locale === "sl" ? "AI Avtomatizacijski sistemi" : "AI Automation Systems",
      description: locale === "sl"
        ? "Celovite rešitve za avtomatizacijo poslovnih procesov z AI tehnologijo"
        : "Comprehensive AI-powered business process automation solutions",
      numberOfItems: serviceData.length,
      itemListElement: serviceData.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: service,
      })),
    };
  };

  return (
    <Section crosses className={cn("", className)} id="ai-services">
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceStructuredData()),
        }}
      />
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading title={t("title")} text={t("subtitle")} />
        </div>

        {/* Value Proposition Pills */}
        <div className="-mx-5 md:-mx-10 lg:-mx-[3.75rem]">
          <div
            className="px-5 md:px-10 lg:px-[3.75rem] mb-8 sm:mb-12 lg:mb-16 animate-bundle-benefits"
            style={{ animationDelay: "300ms" }}
          >
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

        {/* Services Grid - 3x2 Unified Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 items-stretch max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];

            return (
              <div
                key={service.id}
                className={cn(
                  "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                  "hover:-translate-y-1",
                  "transition-all duration-500 ease-out group",
                  "animate-bundle-card",
                  // Default styling with subtle gradient
                  "bg-gradient-to-br from-color-1/5 to-color-2/5 hover:from-color-1/10 hover:to-color-2/10",
                  // Shadow
                  "shadow-xl shadow-color-1/10 hover:shadow-2xl hover:shadow-color-1/20",
                  // Popular cards get highlighted border
                  service.popular
                    ? "border-color-1/50 hover:border-color-1/60"
                    : "hover:border-color-1/40"
                )}
                style={{ animationDelay: `${300 + index * 150}ms` }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with Icon and Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={cn(
                        "w-14 sm:w-16 h-14 sm:h-16 rounded-xl flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                        "bg-gradient-to-br from-color-1/20 to-color-2/20"
                      )}
                    >
                      <IconComponent className="w-7 sm:w-8 h-7 sm:h-8 text-color-1" />
                    </div>

                    {/* Badge */}
                    <div
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        service.popular
                          ? "bg-gradient-to-r from-color-1 to-color-2 text-n-8"
                          : "bg-n-6 text-n-3"
                      )}
                    >
                      {service.badge}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-n-1 mb-1">
                    {service.title}
                  </h3>

                  {/* Subtitle - Technical Context */}
                  <p className="text-sm text-n-4 mb-3">
                    {service.subtitle}
                  </p>

                  {/* Outcome Headline - Value Proposition */}
                  <p className="text-base sm:text-lg font-semibold text-color-1 mb-4">
                    {service.outcome}
                  </p>

                  {/* Benefits List */}
                  <div className="flex-1">
                    <div className="space-y-3">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-color-1/20 to-color-2/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-color-1" />
                          </div>
                          <span className="text-sm text-n-3">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-color-1/15 via-color-2/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 group-hover:from-color-1/25 group-hover:via-color-2/20 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-color-2/10 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 sm:mt-16 text-center animate-bundle-card"
          style={{ animationDelay: "1200ms" }}
        >
          <p className="text-n-3 mb-6 max-w-2xl mx-auto">
            {t("bottomCta.description")}
          </p>
          <Button href="#contact">{t("bottomCta.button")}</Button>
        </div>
      </div>
    </Section>
  );
};

export default AIServices;
