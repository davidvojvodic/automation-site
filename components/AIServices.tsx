"use client";

import React, { useState } from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";

import {
  TrendingUp,
  Target,
  Headphones,
  Workflow,
  Coins,
  UserSearch,
  Check,
  GitBranch,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

// We use exact icons for the services 
const iconMap = {
  TrendingUp,
  Target,
  Headphones,
  Workflow,
  Coins,
  UserSearch,
} as const;

type IconName = keyof typeof iconMap;

interface AIServicesProps {
  className?: string;
}

const AIServices = ({ className }: AIServicesProps) => {
  const t = useTranslations("HomePage.aiServices");
  const locale = useLocale();

  const services = [
    {
      id: "salesAutomation",
      icon: "TrendingUp" as IconName,
      title: t("salesAutomation.title"),
      badge: t("salesAutomation.badge"),
      subtitle: t("salesAutomation.subtitle"),
      description: t("salesAutomation.description"),
      benefits: [
        t("salesAutomation.benefits.0"),
        t("salesAutomation.benefits.1"),
        t("salesAutomation.benefits.2"),
        t("salesAutomation.benefits.3"),
      ],
      metrics: [
        { value: t("salesAutomation.metrics.value1"), label: t("salesAutomation.metrics.label1") },
        { value: t("salesAutomation.metrics.value2"), label: t("salesAutomation.metrics.label2") }
      ]
    },
    {
      id: "marketingAutomation",
      icon: "Target" as IconName,
      title: t("marketingAutomation.title"),
      badge: t("marketingAutomation.badge"),
      subtitle: t("marketingAutomation.subtitle"),
      description: t("marketingAutomation.description"),
      benefits: [
        t("marketingAutomation.benefits.0"),
        t("marketingAutomation.benefits.1"),
        t("marketingAutomation.benefits.2"),
        t("marketingAutomation.benefits.3"),
      ],
      metrics: [
        { value: t("marketingAutomation.metrics.value1"), label: t("marketingAutomation.metrics.label1") },
        { value: t("marketingAutomation.metrics.value2"), label: t("marketingAutomation.metrics.label2") }
      ]
    },
    {
      id: "customerSupport",
      icon: "Headphones" as IconName,
      title: t("customerSupport.title"),
      badge: t("customerSupport.badge"),
      subtitle: t("customerSupport.subtitle"),
      description: t("customerSupport.description"),
      benefits: [
        t("customerSupport.benefits.0"),
        t("customerSupport.benefits.1"),
        t("customerSupport.benefits.2"),
        t("customerSupport.benefits.3"),
      ],
      metrics: [
        { value: t("customerSupport.metrics.value1"), label: t("customerSupport.metrics.label1") },
        { value: t("customerSupport.metrics.value2"), label: t("customerSupport.metrics.label2") }
      ]
    },
    {
      id: "operations",
      icon: "Workflow" as IconName,
      title: t("operations.title"),
      badge: t("operations.badge"),
      subtitle: t("operations.subtitle"),
      description: t("operations.description"),
      benefits: [
        t("operations.benefits.0"),
        t("operations.benefits.1"),
        t("operations.benefits.2"),
        t("operations.benefits.3"),
      ],
      metrics: [
        { value: t("operations.metrics.value1"), label: t("operations.metrics.label1") },
        { value: t("operations.metrics.value2"), label: t("operations.metrics.label2") }
      ]
    },
    {
      id: "finance",
      icon: "Coins" as IconName,
      title: t("finance.title"),
      badge: t("finance.badge"),
      subtitle: t("finance.subtitle"),
      description: t("finance.description"),
      benefits: [
        t("finance.benefits.0"),
        t("finance.benefits.1"),
        t("finance.benefits.2"),
        t("finance.benefits.3"),
      ],
      metrics: [
        { value: t("finance.metrics.value1"), label: t("finance.metrics.label1") },
        { value: t("finance.metrics.value2"), label: t("finance.metrics.label2") }
      ]
    },
    {
      id: "recruitment",
      icon: "UserSearch" as IconName,
      title: t("recruitment.title"),
      badge: t("recruitment.badge"),
      subtitle: t("recruitment.subtitle"),
      description: t("recruitment.description"),
      benefits: [
        t("recruitment.benefits.0"),
        t("recruitment.benefits.1"),
        t("recruitment.benefits.2"),
        t("recruitment.benefits.3"),
      ],
      metrics: [
        { value: t("recruitment.metrics.value1"), label: t("recruitment.metrics.label1") },
        { value: t("recruitment.metrics.value2"), label: t("recruitment.metrics.label2") }
      ]
    },
  ];

  const [activeTabId, setActiveTabId] = useState(services[0].id);
  const currentIndex = services.findIndex((s) => s.id === activeTabId);

  const handleTabClick = (id: string, index: number) => {
    setActiveTabId(id);
  };

  const handleNext = () => {
    if (currentIndex < services.length - 1) {
      setActiveTabId(services[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTabId(services[currentIndex - 1].id);
    }
  };

  // Generate structured data for services
  const generateServiceStructuredData = () => {
    const serviceData = services.map((system) => ({
      "@type": "Service",
      "@id": `https://flowko.io/${locale}#${system.id}`,
      name: system.title,
      description: system.description,
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
    <Section crosses className={cn(className)} id="ai-services">
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
            className="px-5 md:px-10 lg:px-[3.75rem] mb-12 sm:mb-16 lg:mb-20 animate-bundle-benefits"
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

        {/* Tabbed UI Container */}
        <div className="max-w-[1200px] mx-auto animate-bundle-card" style={{ animationDelay: "600ms" }}>

          {/* Tab Navigation */}
          <div className="flex items-end justify-between border-b border-n-6 mb-8 lg:mb-12">

            {/* Tabs (Scrollable on Mobile) */}
            <div className="flex overflow-x-auto hide-scrollbar pb-0">
              <div className="flex space-x-2 sm:space-x-8 px-2 w-max mx-auto sm:mx-0">
                {services.map((service, index) => {
                  const isActive = activeTabId === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleTabClick(service.id, index)}
                      className={cn(
                        "relative pb-4 px-2 sm:px-4 text-sm sm:text-base font-medium transition-colors whitespace-nowrap outline-none",
                        isActive
                          ? "text-n-1"
                          : "text-n-4 hover:text-n-2"
                      )}
                    >
                      {service.badge}
                      {/* Active Indicator Underline */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-color-1 to-color-2 animate-fade-in" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Navigation Arrows (True Horizon Style) */}
            <div className="hidden lg:flex items-center gap-2 pb-3 pr-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={cn(
                  "p-1.5 rounded border transition-colors",
                  currentIndex === 0
                    ? "border-n-6/50 text-n-6 cursor-not-allowed bg-transparent"
                    : "border-n-6 text-n-4 hover:text-n-1 hover:border-n-4 bg-n-8"
                )}
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === services.length - 1}
                className={cn(
                  "p-1.5 rounded border transition-colors",
                  currentIndex === services.length - 1
                    ? "border-n-6/50 text-n-6 cursor-not-allowed bg-transparent"
                    : "border-n-6 text-n-4 hover:text-n-1 hover:border-n-4 bg-n-8"
                )}
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2-Column Content Carousel (Inspired by True Horizon) */}
          <div className="bg-n-8 border border-n-6 rounded-none relative overflow-hidden group">

            {/* Dark Mode Glow effects - Static Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-color-1/10 via-color-2/5 to-transparent opacity-50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

            {/* Carousel Inner Track */}
            <div
              className="flex transition-transform duration-1000 ease-in-out relative z-10"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <div key={service.id} className="min-w-full grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column: The Pitch */}
                    <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
                      <div className="max-w-xl">
                        {/* Icon & Label */}
                        <div className="flex items-center gap-4 mb-8">
                          <div className="flex items-center justify-center w-12 h-12 bg-color-1/10 text-color-1 rounded-none border border-color-1/20">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="text-color-1 font-mono text-sm uppercase tracking-widest">{service.badge}</span>
                        </div>

                        {/* Headline & Description */}
                        <h3 className="text-3xl lg:text-4xl font-sans font-bold text-n-1 mb-4 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-lg text-n-3 mb-10 leading-relaxed font-light">
                          {service.description}
                        </p>

                        {/* Benefits List (Square Bullets like True Horizon) */}
                        <ul className="space-y-4 mb-12">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                              <div className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 bg-color-1 rounded-sm shadow-[0_0_10px_rgba(172,106,255,0.4)]" />
                              <span className="text-n-2 text-base">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Left Column Action */}
                      <div>
                        <Button href="#contact" className="rounded-none font-bold uppercase tracking-wider text-sm px-8 py-4 w-full sm:w-auto">
                          {locale === "sl" ? "Pogovorite se s strokovnjakom" : "Discuss your needs"}
                        </Button>
                      </div>
                    </div>

                    {/* Right Column: The ROI Box */}
                    <div className="bg-n-7/50 border-t lg:border-t-0 lg:border-l border-n-6 p-8 lg:p-12 xl:p-16 flex flex-col justify-center">

                      <div className="mb-10">
                        <h4 className="text-n-4 font-mono text-sm uppercase tracking-widest mb-2">
                          {locale === "sl" ? "Tipični Rezultati" : "Typical Outcomes"}
                        </h4>
                        <div className="h-[1px] w-12 bg-color-1/50" />
                      </div>

                      <div className="grid grid-cols-1 gap-12">
                        {service.metrics.map((metric, idx) => (
                          <div key={idx}>
                            <div className="text-5xl lg:text-7xl font-sans font-bold text-n-1 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-color-1 to-color-2 pb-1">
                              {metric.value}
                            </div>
                            <div className="text-lg lg:text-xl text-n-3 max-w-xs font-light">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Trust/Disclaimer Footer */}
                      <div className="mt-16 pt-8 border-t border-n-6/50 flex items-center gap-3">
                        <Check className="w-5 h-5 text-color-4" />
                        <p className="text-sm text-n-4">
                          {t("disclaimer")}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AIServices;
