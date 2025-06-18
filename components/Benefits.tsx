"use client";

import React from "react";
import { benefits } from "@/lib/constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "@/public/assets/svg/Arrow";
import ClipPath from "@/public/assets/svg/ClipPath";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import GradientLight from "./design/Benefits";
import {useTranslations} from 'next-intl';

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
  const t = useTranslations('HomePage.benefits');
  
  return (
    <Section id="features" className={cn(className)}>
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={t('title')}
        />

        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {benefits.map((item: BenefitItem) => (
            <div
              className={cn(
                "block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              )}
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{t(`benefit${Number(item.id) + 1}.title`)}</h5>
                <p className="body-2 mb-6 text-n-3">{t(`benefit${Number(item.id) + 1}.description`)}</p>
                <div className="flex items-center mt-auto">
                  <Image
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={t(`benefit${Number(item.id) + 1}.title`)}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={t(`benefit${Number(item.id) + 1}.title`)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Benefits;
