"use client";

import { curve } from "@/public/assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine } from "./design/Hero";

import { useRef } from "react";
import CompanyLogos from "./CompanyLogos";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface HeroProps {
  className?: string;
}

function Hero(props: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("HomePage.hero");

  return (
    <Section
      className={cn("pt-[12rem] -mt-[5.25rem]", props.className)}
      crosses={true}
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="py-10 lg:py-16 xl:py-20"
      id="hero"
    >
      <div className="container relative mt-1 lg:mt-36" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            {t("title")}{" "}
            <span className="inline-block relative">
              {t("subtitle")}
              <Image
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mt-12 mb-6 text-n-2 lg:mb-8">
            {t("description")}
          </p>
          <Button className="mt-6" href="#contact" white>
            {t("cta")}
          </Button>
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

        <CompanyLogos className="relative z-10 mt-10 md:mt-40" />
      </div>

      <BottomLine />
    </Section>
  );
}

export default Hero;
