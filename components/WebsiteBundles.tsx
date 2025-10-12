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
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-color-1 flex-shrink-0" />
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
            <a
              href="#contact"
              key={solution.id}
              className={cn(
                "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                "hover:-translate-y-1",
                "transition-all duration-500 ease-out group cursor-pointer",
                "animate-bundle-card",
                // Default shadows for depth
                !solution.isPremium && "shadow-xl shadow-color-1/10",
                solution.isPremium && "shadow-xl shadow-color-6/10",
                // Popular card styling
                solution.popular &&
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-transparent hover:from-color-1/10 hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/15",
                // Premium card styling
                solution.isPremium &&
                  "border-color-6/50 bg-gradient-to-br from-color-6/5 to-transparent hover:from-color-6/10 hover:border-color-6/40 hover:shadow-2xl hover:shadow-color-6/15",
                // Foundation card hover (neutral)
                !solution.popular && !solution.isPremium &&
                  "hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/15"
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
                          "w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                          solution.isPremium && "bg-color-6/10"
                        )}
                      >
                        {React.createElement(solution.icon, {
                          className: cn(
                            "w-7 sm:w-8 h-7 sm:h-8 text-color-1",
                            solution.isPremium && "text-color-6"
                          ),
                        })}
                      </div>
                    </div>

                    {/* Badge */}
                    <div
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        solution.popular && "bg-color-1 text-n-8",
                        solution.isPremium && "bg-color-6 text-n-8",
                        !solution.popular &&
                          !solution.isPremium &&
                          "bg-n-6 text-n-3"
                      )}
                    >
                      {solution.badge}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-n-1 mb-2 group-hover:text-color-1 transition-colors duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-sm sm:text-base text-color-1 font-medium mb-3">
                      {solution.subtitle}
                    </p>
                    <p className="text-sm text-n-4 group-hover:text-n-3 transition-colors duration-300 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                  <div className="text-xs text-n-4 uppercase tracking-wider mb-1">
                    {t("labels.idealFor")}
                  </div>
                  <p className="text-sm text-n-2">
                    {solution.idealFor}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-bold text-n-1 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-color-1" />
                    {t("labels.includedFeatures")}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {solution.capabilities.map(
                      (capability: string, capIndex: number) => (
                        <div
                          key={capIndex}
                          className="flex items-center gap-2 p-2 rounded-lg bg-n-7 group-hover:bg-n-6 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-color-1 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-n-1">{capability}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-all duration-500",
                  solution.isPremium
                    ? "from-color-6/10 group-hover:from-color-6/20"
                    : "from-color-1/10 group-hover:from-color-1/20"
                )}
              ></div>
            </a>
          ))}
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
            <div className="flex justify-center">
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

export default WebsiteBundles;
