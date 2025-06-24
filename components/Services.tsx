"use client";

import Section from "./Section";
import Heading from "./Heading";
import { check } from "@/public/assets";
import {
  Bot,
  FileSearch,
  Cog,
  Sparkles,
  TrendingUp,
  Zap,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
      icon: Bot,
      gradient: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      key: "solution2",
      icon: FileSearch,
      gradient: "from-green-500/20 to-blue-500/20",
      iconColor: "text-green-400",
    },
    {
      id: 3,
      key: "solution3",
      icon: Cog,
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400",
    },
    {
      id: 4,
      key: "solution4",
      icon: Sparkles,
      gradient: "from-pink-500/20 to-purple-500/20",
      iconColor: "text-pink-400",
    },
    {
      id: 5,
      key: "solution5",
      icon: TrendingUp,
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconColor: "text-indigo-400",
    },
    {
      id: 6,
      key: "solution6",
      icon: Zap,
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <Section id="services" className={className}>
      <div className="container">
        <Heading title={t("title")} text={t("subtitle")} />

        <div className="relative">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-6 gap-6">
            {solutions.map((solution, index) => {
              // Define proper bento grid layout
              const getBentoClasses = (idx: number) => {
                switch (idx) {
                  case 0:
                    return "col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-4"; // Mobile: full, md: full, lg: half, xl: 2/3
                  case 1:
                    return "col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-2"; // Mobile: full, md: full, lg: half, xl: 1/3
                  case 2:
                    return "col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2"; // Mobile: full, md: half, lg: 1/3, xl: 1/3
                  case 3:
                    return "col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2"; // Mobile: full, md: half, lg: 1/3, xl: 1/3
                  case 4:
                    return "col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2"; // Mobile: full, md: full, lg: 1/3, xl: 1/3
                  case 5:
                    return "col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6"; // Always full width
                  default:
                    return "col-span-6 md:col-span-2";
                }
              };

              const getHeightClasses = (idx: number) => {
                switch (idx) {
                  case 0:
                    return "min-h-[400px] lg:min-h-[500px]"; // Auto-growing height - top left
                  case 1:
                    return "min-h-[400px] lg:min-h-[500px]"; // Auto-growing height - top right
                  case 2:
                    return "min-h-[400px] lg:min-h-[450px]"; // Auto-growing height - middle left
                  case 3:
                    return "min-h-[400px] lg:min-h-[450px]"; // Auto-growing height - middle center
                  case 4:
                    return "min-h-[400px] lg:min-h-[450px]"; // Auto-growing height - middle right
                  case 5:
                    return "min-h-[400px]"; // Auto-growing height - bottom full width
                  default:
                    return "min-h-[400px]";
                }
              };

              return (
                <div
                  key={solution.id}
                  className={cn(
                    "relative p-6 md:p-8 border border-n-1/10 rounded-3xl overflow-hidden",
                    "bg-gradient-to-br",
                    solution.gradient,
                    "hover:border-color-1/50 hover:shadow-2xl hover:shadow-color-1/10",
                    "transition-all duration-500 ease-out",
                    "hover:scale-[1.02] hover:-translate-y-1",
                    "group cursor-pointer",
                    "animate-fade-in-up",
                    getBentoClasses(index),
                    getHeightClasses(index)
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-color-1/3 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 ease-out" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-color-1/3 to-transparent rounded-full blur-xl group-hover:scale-105 transition-transform duration-400 ease-out" />
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-color-1/0 via-color-1/10 to-color-1/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-color-1/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-color-1/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
                    <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-color-1/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                        "bg-n-7/50 backdrop-blur-sm border border-n-6/50",
                        "group-hover:border-color-1/50 group-hover:bg-color-1/10",
                        "group-hover:scale-110 group-hover:rotate-3",
                        "transition-all duration-500 ease-out",
                        "group-hover:shadow-lg group-hover:shadow-color-1/20"
                      )}
                    >
                      <solution.icon
                        className={cn(
                          "w-8 h-8 transition-all duration-500 ease-out",
                          "group-hover:scale-110",
                          solution.iconColor
                        )}
                      />
                    </div>

                    {/* Content */}
                    <h4 className="h5 mb-4 text-n-1 group-hover:text-color-1 transition-colors duration-300">
                      {t(`${solution.key}.title`)}
                    </h4>
                    <p className="body-2 mb-6 text-n-3 group-hover:text-n-2 transition-colors duration-300">
                      {t(`${solution.key}.description`)}
                    </p>

                    {/* Features - Show all features */}
                    <ul className="space-y-3 mb-6 flex-grow">
                      {t
                        .raw(`${solution.key}.features`)
                        .map((item: string, featureIndex: number) => (
                          <li
                            key={featureIndex}
                            className="flex items-start text-sm group-hover:translate-x-1 transition-transform duration-300"
                            style={{
                              animationDelay: `${(index * 100) + (featureIndex * 50)}ms`,
                            }}
                          >
                            <Image
                              width={16}
                              height={16}
                              src={check}
                              alt="check"
                              className="mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-n-3 group-hover:text-n-2 transition-colors duration-300">{item}</span>
                          </li>
                        ))}
                    </ul>

                    {/* ROI Metric - Always at bottom */}
                    <div className="pt-4 border-t border-n-6/30 group-hover:border-color-1/30 mt-auto transition-colors duration-300">
                      <p className="text-sm font-semibold text-color-1">
                        {t(`${solution.key}.roi`)}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-color-1/0 to-color-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-n-7/50 rounded-full border border-n-6/50 backdrop-blur-sm">
              <Brain className="w-5 h-5 text-color-1" />
              <span className="text-sm text-n-3">{t("bottomText")}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Services;
