"use client";

import React from "react";
import { benefits } from "@/lib/constants";
import Heading from "./Heading";
import Section from "./Section";
import ClipPath from "@/public/assets/svg/ClipPath";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import GradientLight from "./design/Benefits";
import { useTranslations } from "next-intl";
import {
  Clock,
  TrendingUp,
  Target,
  Zap,
  DollarSign,
  Shield,
  Check,
} from "lucide-react";

interface BenefitItem {
  id: string | number;
  title: string;
  text: string;
  iconUrl: string;
  backgroundUrl: string;
  imageUrl?: StaticImageData;
  light?: boolean;
}

interface BenefitsProps {
  className?: string;
}

function Benefits({ className }: BenefitsProps) {
  const t = useTranslations("HomePage.benefits");

  const icons = [Clock, TrendingUp, Target, Zap, DollarSign, Shield];

  return (
    <Section crosses id="features" className={cn(className)}>
      <div className="container relative z-2">
        <Heading className="md:max-w-md lg:max-w-2xl" title={t("title")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">
          {benefits.map((item: BenefitItem) => (
            <div
              className={cn(
                "block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full"
              )}
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[14rem] sm:min-h-[16rem] lg:min-h-[18rem] p-4 sm:p-6 lg:p-8 pointer-events-none">
                <div className="flex items-center mb-3 sm:mb-4">
                  {React.createElement(icons[Number(item.id)], {
                    className: "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-color-1 mr-2 sm:mr-3 flex-shrink-0",
                  })}
                  <h5 className="text-base sm:text-lg lg:text-xl font-bold">
                    {t(`benefit${Number(item.id) + 1}.title`)}
                  </h5>
                </div>
                <p className="text-sm sm:text-base text-n-3 mb-3 sm:mb-4 leading-relaxed">
                  {t(`benefit${Number(item.id) + 1}.description`)}
                </p>
                <ul className="space-y-1.5 sm:space-y-2 flex-1">
                  {[0, 1, 2]
                    .map((pointIndex) => {
                      try {
                        const point = t(
                          `benefit${Number(item.id) + 1}.points.${pointIndex}`
                        );
                        if (!point) return null;
                        return (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-1.5 sm:gap-2"
                          >
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-color-1 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-n-2 leading-relaxed">{point}</span>
                          </li>
                        );
                      } catch {
                        return null;
                      }
                    })
                    .filter(Boolean)}
                </ul>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              ></div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Benefits;
