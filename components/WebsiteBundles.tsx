"use client";

import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { Zap, Globe, Workflow, ShoppingCart, Code, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface BundleProps {
  className?: string;
}

const WebsiteBundles = ({ className }: BundleProps) => {
  const t = useTranslations("HomePage.websiteBundles");

  const solutions = [
    {
      id: "foundation",
      icon: Zap,
      title: t("foundation.title"),
      subtitle: t("foundation.subtitle"),
      description: t("foundation.description"),
      idealFor: t("foundation.idealFor"),
      capabilities: [
        t("foundation.capabilities.0"),
        t("foundation.capabilities.1"),
        t("foundation.capabilities.2"),
        t("foundation.capabilities.3"),
        t("foundation.capabilities.4"),
      ],
      badge: t("foundation.badge"),
      popular: false,
      timeline: "3-4 weeks",
      pricing: "Custom quote based on requirements",
      techStack: ["Next.js", "React", "Tailwind CSS", "n8n", "Vercel"],
      deliverables: [
        "Fully responsive website",
        "Content management system",
        "Automated workflows",
        "Analytics dashboard",
        "1 month support included"
      ]
    },
    {
      id: "growth",
      icon: ShoppingCart,
      title: t("growth.title"),
      subtitle: t("growth.subtitle"),
      description: t("growth.description"),
      idealFor: t("growth.idealFor"),
      capabilities: [
        t("growth.capabilities.0"),
        t("growth.capabilities.1"),
        t("growth.capabilities.2"),
        t("growth.capabilities.3"),
        t("growth.capabilities.4"),
      ],
      badge: t("growth.badge"),
      popular: true,
      timeline: "5-7 weeks",
      pricing: "Custom quote based on requirements",
      techStack: ["Next.js", "Stripe", "n8n", "PostgreSQL", "Vercel"],
      deliverables: [
        "E-commerce platform",
        "Payment processing setup",
        "Inventory management system",
        "Marketing automation workflows",
        "3 months support included"
      ]
    },
    {
      id: "dominator",
      icon: Code,
      title: t("dominator.title"),
      subtitle: t("dominator.subtitle"),
      description: t("dominator.description"),
      idealFor: t("dominator.idealFor"),
      capabilities: [
        t("dominator.capabilities.0"),
        t("dominator.capabilities.1"),
        t("dominator.capabilities.2"),
        t("dominator.capabilities.3"),
      ],
      badge: t("dominator.badge"),
      popular: false,
      isPremium: true,
      timeline: "8-12 weeks",
      pricing: "Enterprise pricing - Contact for custom quote",
      techStack: ["Custom tech stack based on requirements", "Cloud infrastructure", "Advanced integrations"],
      deliverables: [
        "Custom web application",
        "Complete technical architecture",
        "Multi-system integrations",
        "Enterprise dashboards",
        "6 months support included",
        "Dedicated technical consultant"
      ]
    },
  ];

  return (
    <Section crosses className={cn("", className)} id="bundles">
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading
            tag={t("tag")}
            title={t("title")}
            text={t("subtitle")}
          />
        </div>

        {/* Value Proposition Pills */}
        <div className="-mx-5 md:-mx-10 lg:-mx-[3.75rem]">
          <div
            className="flex sm:justify-center mb-8 sm:mb-12 lg:mb-16 animate-bundle-benefits px-5 md:px-10 lg:px-[3.75rem]"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative w-full sm:max-w-4xl text-center">
              <div className="flex flex-col sm:flex-row flex-wrap sm:justify-center gap-3 sm:gap-4 lg:gap-6 mb-8">
              {[
                { icon: Globe, text: t("valueProps.modernWeb") },
                { icon: Database, text: t("valueProps.smartAutomation") },
                { icon: Workflow, text: t("valueProps.endToEnd") },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-auto flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-n-7 rounded-xl sm:rounded-2xl hover:bg-n-6 hover:scale-105 transition-all duration-300 animate-bundle-pill"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-color-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-n-1 whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              className={cn(
                "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                "hover:-translate-y-1",
                "transition-all duration-500 ease-out group",
                "animate-bundle-card",
                // Default shadows for depth
                !solution.isPremium && "shadow-xl shadow-color-1/10 hover:shadow-2xl hover:shadow-color-1/20",
                solution.isPremium && "shadow-xl shadow-color-2/10 hover:shadow-2xl hover:shadow-color-2/20",
                // Popular card styling
                solution.popular &&
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-color-2/5 hover:from-color-1/10 hover:to-color-2/10 hover:border-color-1/60",
                // Premium card styling
                solution.isPremium &&
                  "border-color-2/50 bg-gradient-to-br from-color-1/5 to-color-2/5 hover:from-color-1/10 hover:to-color-2/10 hover:border-color-2/60",
                // Foundation card hover
                !solution.popular && !solution.isPremium &&
                  "bg-gradient-to-br from-color-1/5 to-color-2/5 hover:from-color-1/10 hover:to-color-2/10 hover:border-color-1/40"
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
                          "w-14 sm:w-16 h-14 sm:h-16 rounded-xl flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                          "bg-gradient-to-br from-color-1/20 to-color-2/20"
                        )}
                      >
                        {React.createElement(solution.icon, {
                          className: cn(
                            "w-7 sm:w-8 h-7 sm:h-8 text-color-1"
                          ),
                        })}
                      </div>
                    </div>

                    {/* Badge */}
                    <div
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        solution.popular && "bg-gradient-to-r from-color-1 to-color-2 text-n-8",
                        solution.isPremium && "bg-gradient-to-r from-color-1 to-color-2 text-n-8",
                        !solution.popular &&
                          !solution.isPremium &&
                          "bg-n-6 text-n-3"
                      )}
                    >
                      {solution.badge}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-n-1 mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm sm:text-base bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent font-medium">
                      {solution.subtitle}
                    </p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mb-4">
                  <div className="text-xs text-n-4 uppercase tracking-wider mb-2">
                    {t("labels.idealFor")}
                  </div>
                  <p className="text-sm text-n-2">
                    {solution.idealFor}
                  </p>
                </div>

                {/* All Features */}
                <div className="flex-1 mb-6">
                  <div className="mb-3">
                    <h4 className="text-xs font-bold bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent uppercase tracking-wider">
                      Includes
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {solution.capabilities.map(
                      (capability: string, capIndex: number) => (
                        <div
                          key={capIndex}
                          className="flex items-start gap-2 text-xs text-n-3"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex-shrink-0 mt-1.5"></div>
                          <span>{capability}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    className="w-full"
                    href="#contact"
                  >
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-color-1/15 via-color-2/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 group-hover:from-color-1/25 group-hover:via-color-2/20 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-color-2/10 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
};

export default WebsiteBundles;
