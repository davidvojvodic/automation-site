"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import { Clock, TrendingUp, ShieldCheck, Zap } from "lucide-react";

interface BenefitsBannerProps {
  className?: string;
}

function BenefitsBanner({ className }: BenefitsBannerProps) {
  const benefits = [
    {
      icon: Clock,
      text: "Save 20+ Hours Weekly",
    },
    {
      icon: TrendingUp,
      text: "Scale Without Hiring",
    },
    {
      icon: ShieldCheck,
      text: "99.9% Accuracy",
    },
    {
      icon: Zap,
      text: "24/7 Operation",
    },
  ];

  return (
    <Section crosses customPaddings="py-6 lg:py-12 xl:py-16" className={cn(className)}>
      <div className="container">
        <div className="relative z-1">
          <div className="bg-n-8/90 backdrop-blur border border-n-1/10 rounded-[2rem] py-4 sm:py-5 lg:py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 group"
                >
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-color-1 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-n-1">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default BenefitsBanner;