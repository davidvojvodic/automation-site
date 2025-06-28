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

        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {benefits.map((item: BenefitItem) => (
            <div
              className={cn(
                "block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full md:w-[24rem]"
              )}
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <div className="flex items-center mb-4">
                  {React.createElement(icons[Number(item.id)], {
                    className: "w-10 h-10 text-color-1 mr-3",
                  })}
                  <h5 className="h6">
                    {t(`benefit${Number(item.id) + 1}.title`)}
                  </h5>
                </div>
                <p className="body-2 text-n-3 mb-4">
                  {t(`benefit${Number(item.id) + 1}.description`)}
                </p>
                <ul className="space-y-2 flex-1">
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
                            className="flex items-start gap-2"
                          >
                            <Check className="w-4 h-4 text-color-1 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-n-2">{point}</span>
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
