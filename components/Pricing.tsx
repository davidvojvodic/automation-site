"use client";

import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { Workflow, Code, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface PricingProps {
  className?: string;
}

const Pricing = ({ className }: PricingProps) => {
  const t = useTranslations("HomePage.pricing");

  const pricingTiers = [
    {
      id: "consulting",
      icon: Workflow,
      title: t("consulting.title"),
      price: t("consulting.price"),
      priceSubtext: t("consulting.priceSubtext"),
      description: t("consulting.description"),
      features: [
        t("consulting.features.0"),
        t("consulting.features.1"),
        t("consulting.features.2"),
        t("consulting.features.3"),
        t("consulting.features.4"),
      ],
      cta: t("consulting.cta"),
      badge: t("consulting.badge"),
      popular: false,
    },
    {
      id: "customProject",
      icon: Code,
      title: t("customProject.title"),
      price: t("customProject.price"),
      priceSubtext: t("customProject.priceSubtext"),
      description: t("customProject.description"),
      features: [
        t("customProject.features.0"),
        t("customProject.features.1"),
        t("customProject.features.2"),
        t("customProject.features.3"),
        t("customProject.features.4"),
      ],
      cta: t("customProject.cta"),
      badge: t("customProject.badge"),
      popular: true,
    },
    {
      id: "partner",
      icon: Users,
      title: t("partner.title"),
      price: t("partner.price"),
      priceSubtext: t("partner.priceSubtext"),
      description: t("partner.description"),
      features: [
        t("partner.features.0"),
        t("partner.features.1"),
        t("partner.features.2"),
        t("partner.features.3"),
        t("partner.features.4"),
      ],
      cta: t("partner.cta"),
      badge: t("partner.badge"),
      popular: false,
    },
  ];

  return (
    <Section crosses className={cn("", className)} id="pricing">
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading
            tag={t("tag")}
            title={t("title")}
            text={t("subtitle")}
          />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.id}
              className={cn(
                "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                "hover:-translate-y-1",
                "transition-all duration-500 ease-out group",
                "animate-bundle-card",
                // Default shadows for depth
                !tier.popular && "shadow-xl shadow-color-1/10 hover:shadow-2xl hover:shadow-color-1/20",
                // Popular card styling
                tier.popular &&
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-color-2/5 hover:from-color-1/10 hover:to-color-2/10 hover:border-color-1/60 shadow-xl shadow-color-1/10 hover:shadow-2xl hover:shadow-color-1/20",
                // Default card hover
                !tier.popular &&
                  "bg-gradient-to-br from-color-1/5 to-color-2/5 hover:from-color-1/10 hover:to-color-2/10 hover:border-color-1/40"
              )}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Header with Icon and Badge */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-14 sm:w-16 h-14 sm:h-16 rounded-xl flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                          "bg-gradient-to-br from-color-1/20 to-color-2/20"
                        )}
                      >
                        {React.createElement(tier.icon, {
                          className: "w-7 sm:w-8 h-7 sm:h-8 text-color-1",
                        })}
                      </div>
                    </div>

                    {/* Badge */}
                    {tier.badge && (
                      <div
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                          tier.popular && "bg-gradient-to-r from-color-1 to-color-2 text-n-8",
                          !tier.popular && "bg-n-6 text-n-3"
                        )}
                      >
                        {tier.badge}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-n-1 mb-2">
                      {tier.title}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent mb-2">
                    {tier.price}
                  </div>
                  {tier.priceSubtext && (
                    <p className="text-sm text-n-4">
                      {tier.priceSubtext}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-sm text-n-2">
                    {tier.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 mb-6">
                  <div className="mb-3">
                    <h4 className="text-xs font-bold bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent uppercase tracking-wider">
                      What's included
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {tier.features.map((feature: string, featureIndex: number) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm text-n-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-color-1/20 to-color-2/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-color-1" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    className="w-full"
                    href="#contact"
                  >
                    {tier.cta}
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

export default Pricing;
