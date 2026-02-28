"use client";

import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles } from "./design/Hero";
import { HeroCurve } from "./design/HeroCurve";
import { ReasoningTerminal } from "./ReasoningTerminal";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

export interface HeroProps {
  className?: string;
}

function Hero(props: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("HomePage.hero");
  const locale = useLocale();

  return (
    <Section
      className={cn(
        "pt-16 sm:pt-[7rem] lg:pt-[9rem] mt-2 overflow-hidden",
        props.className
      )}
      crosses={true}
      crossesOffset="lg:translate-y-[.25rem]"
      customPaddings="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20"
      id="hero"
    >
      <div
        className="container relative mt-1 sm:mt-8 md:mt-12 lg:mt-20"
        ref={parallaxRef}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10 sm:mb-16 md:mb-20 lg:mb-[6.25rem]">
          {/* Left Column: Text & CTA */}
          <div className="relative z-1 text-left">
            {/* SEO-optimized Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium mb-4 sm:mb-6 animate-hero-title leading-tight">
              <span className="inline-block" style={{ animationDelay: "0ms" }}>
                {t("title")}
                {locale === "sl" && (
                  <span className="sr-only"> - Avtomatizacija poslovnih procesov v Sloveniji</span>
                )}
              </span>{" "}
              <br className="max-lg:hidden" />
              <span
                className={cn(
                  "inline-block relative animate-hero-subtitle text-color-1",
                  locale === "sl" && "tracking-tighter"
                )}
                style={{ animationDelay: "100ms" }}
              >
                {t("subtitle")}
                <HeroCurve
                  className="absolute top-full left-0 w-full max-w-[400px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[730px] xl:max-w-[730px] -mt-1 sm:-mt-1.5 md:-mt-2"
                  delay={200}
                />
              </span>
            </h1>

            {/* Animated Description */}
            <p
              className="text-base sm:text-lg lg:text-xl max-w-xl mt-6 sm:mt-8 lg:mt-12 mb-4 sm:mb-6 text-n-3 lg:mb-8 animate-hero-description leading-relaxed"
              style={{ animationDelay: "200ms" }}
            >
              {t("description")}
            </p>

            {/* Animated CTA Button */}
            <div className="animate-hero-cta" style={{ animationDelay: "300ms", display: "flex", justifyContent: "flex-start" }}>
              <Button
                className="mt-4 sm:mt-6 text-sm sm:text-base
                  hover:scale-[1.02] hover:text-color-1
                  hover:shadow-[0_8px_24px_-4px_rgba(172,106,255,0.20),0_4px_8px_-2px_rgba(172,106,255,0.10)]
                  focus-visible:scale-[1.02] focus-visible:text-color-1
                  focus-visible:shadow-[0_8px_24px_-4px_rgba(172,106,255,0.20),0_4px_8px_-2px_rgba(172,106,255,0.10)]
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-color-1 focus-visible:outline-offset-2
                  active:scale-[0.98]
                  motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100
                  motion-reduce:active:scale-100 motion-reduce:transition-colors
                  transition-all duration-200 ease-in-out"
                href="#contact"
                white
              >
                {t("cta")}
              </Button>
            </div>
          </div>

          {/* Right Column: Reasoning Terminal */}
          <div className="relative z-1 animate-hero-terminal opacity-0 min-h-[540px] h-full flex flex-col justify-center" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
            <ReasoningTerminal />
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>
      </div>
    </Section>
  );
}

export default Hero;
