"use client";

import Section from "./Section";
import Heading from "./Heading";
import {
  FileText,
  Factory,
  Briefcase,
  Package,
  Shield,
  Workflow,
  Clock,
  Euro,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ServicesProps {
  className?: string;
}

function Services({ className }: ServicesProps) {
  const t = useTranslations("HomePage.solutions");

  const solutions = [
    {
      id: 1,
      key: "solution1",
      icon: FileText,
      gradient: "from-purple-600/10 to-blue-600/10",
      borderGradient: "from-purple-600 to-blue-600",
    },
    {
      id: 2,
      key: "solution2",
      icon: Factory,
      gradient: "from-blue-600/10 to-cyan-600/10",
      borderGradient: "from-blue-600 to-cyan-600",
    },
    {
      id: 3,
      key: "solution3",
      icon: Briefcase,
      gradient: "from-cyan-600/10 to-teal-600/10",
      borderGradient: "from-cyan-600 to-teal-600",
    },
    {
      id: 4,
      key: "solution4",
      icon: Package,
      gradient: "from-teal-600/10 to-green-600/10",
      borderGradient: "from-teal-600 to-green-600",
    },
    {
      id: 5,
      key: "solution5",
      icon: Shield,
      gradient: "from-green-600/10 to-purple-600/10",
      borderGradient: "from-green-600 to-purple-600",
    },
    {
      id: 6,
      key: "solution6",
      icon: Workflow,
      gradient: "from-purple-600/10 to-pink-600/10",
      borderGradient: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <Section id="services" className={className}>
      <div className="container">
        <Heading title={t("title")} text={t("subtitle")} />

        <div className="relative">
          {/* Clean Grid Layout - 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={cn(
                  "group relative overflow-hidden",
                  "animate-fade-in-up"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient border effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-r p-[1px]",
                  solution.borderGradient,
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                )} />
                
                {/* Card content */}
                <div className={cn(
                  "relative h-full rounded-2xl p-8",
                  "bg-n-8 border border-n-6",
                  "group-hover:border-transparent",
                  "transition-all duration-500"
                )}>
                  {/* Background gradient */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0",
                    solution.gradient,
                    "group-hover:opacity-100 transition-opacity duration-500"
                  )} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br",
                        solution.gradient,
                        "group-hover:scale-110 transition-transform duration-300"
                      )}>
                        <solution.icon className="w-7 h-7 text-n-1" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h4 className="h5 mb-3 text-n-1">
                      {t(`${solution.key}.title`)}
                    </h4>
                    <p className="body-2 mb-6 text-n-3 line-clamp-2">
                      {t(`${solution.key}.description`)}
                    </p>

                    {/* Metrics */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-color-1" />
                        <span className="text-sm text-n-2">
                          <span className="font-semibold text-n-1">{t(`${solution.key}.timeMetric`)}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Euro className="w-4 h-4 text-color-1" />
                        <span className="text-sm text-n-2">
                          <span className="font-semibold text-n-1">{t(`${solution.key}.costMetric`)}</span>
                        </span>
                      </div>
                    </div>

                    {/* ROI Text */}
                    <div className="pt-6 border-t border-n-6">
                      <p className="text-sm font-medium text-color-1">
                        {t(`${solution.key}.roi`)}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-n-3 mb-6">{t("ctaText")}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-color-1 hover:bg-color-1/90 text-n-8 rounded-xl font-semibold transition-colors duration-300"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Services;
