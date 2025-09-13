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
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={t("title")}
          text={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-10">
          {benefits.map((item: BenefitItem) => (
            <div
              className={cn(
                "group relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
              )}
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[8rem] sm:min-h-[9rem] lg:min-h-[10rem] p-4 sm:p-5 lg:p-6 pointer-events-none">
                <div className="flex items-center mb-2 sm:mb-3">
                  {React.createElement(icons[Number(item.id)], {
                    className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-color-1 mr-2 sm:mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
                  })}
                  <h5 className="text-sm sm:text-base lg:text-lg font-bold text-white">
                    {t(`benefit${Number(item.id) + 1}.title`)}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-n-3 leading-relaxed flex-1">
                  {t(`benefit${Number(item.id) + 1}.description`)}
                </p>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8 group-hover:bg-n-7 transition-colors duration-300"
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
