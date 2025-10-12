"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import { Clock, Layers, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

interface BenefitsBannerProps {
  className?: string;
}

function BenefitsBanner({ className }: BenefitsBannerProps) {
  const t = useTranslations("HomePage.benefitsBanner");

  const benefits = [
    {
      icon: Clock,
      text: t("save20Hours"),
    },
    {
      icon: Layers,
      text: t("scaleWithoutHiring"),
    },
    {
      icon: ShieldCheck,
      text: t("accuracy"),
    },
    {
      icon: Zap,
      text: t("operation24x7"),
    },
  ];

  return (
    <Section
      crosses
      customPaddings="py-6 lg:py-12 xl:py-16"
      className={cn(className)}
    >
      <div className="container">
        <div className="relative z-1">
          <div className="-mx-5 sm:mx-0">
            <div className="bg-n-8/90 backdrop-blur border border-n-1/10 rounded-none sm:rounded-2xl lg:rounded-[2rem] px-5 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 lg:py-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 group"
                  >
                    <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-color-1 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-n-1 whitespace-nowrap">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default BenefitsBanner;
