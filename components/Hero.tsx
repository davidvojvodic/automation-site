"use client";

import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import { HeroCurve } from "./design/HeroCurve";

import { useRef } from "react";
import CompanyLogos from "./CompanyLogos";
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
        "pt-16 sm:pt-[10rem] lg:pt-[12rem] mt-2 sm:mt-3",
        props.className
      )}
      crosses={true}
      crossesOffset="lg:translate-y-[.25rem]"
      customPaddings="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20"
      id="hero"
    >
      <div
        className="container relative mt-1 sm:mt-8 md:mt-20 lg:mt-36"
        ref={parallaxRef}
      >
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-10 sm:mb-16 md:mb-20 lg:mb-[6.25rem]">
          {/* SEO-optimized Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 sm:mb-6 animate-hero-title">
            <span className="inline-block" style={{ animationDelay: "0ms" }}>
              {t("title")}
              {locale === "sl" && (
                <span className="sr-only"> - Avtomatizacija poslovnih procesov v Sloveniji</span>
              )}
            </span>{" "}
            <span
              className="inline-block relative animate-hero-subtitle"
              style={{ animationDelay: "100ms" }}
            >
              {t("subtitle")}
              <HeroCurve
                className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[250px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[730px] xl:max-w-[730px] -mt-1 sm:-mt-1.5 md:-mt-2"
                delay={200}
              />
            </span>
          </h1>

          {/* Animated Description */}
          <p
            className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mt-6 sm:mt-8 lg:mt-12 mb-4 sm:mb-6 text-n-2 lg:mb-8 animate-hero-description leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            {t("description")}
          </p>

          {/* Animated CTA Button */}
          <div className="animate-hero-cta" style={{ animationDelay: "300ms" }}>
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
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          {/*
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <Image
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <Image src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Workflow automation"
                  />
                </ScrollParallax>
              </div>
           
            </div>
            </div> */}

          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>

        <CompanyLogos
          className="relative z-10 mt-10 md:mt-20 lg:mt-32 animate-hero-logos"
          style={{ animationDelay: "400ms" }}
        />
      </div>

      <BottomLine />
    </Section>
  );
}

export default Hero;
