"use client";

import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import Image from "next/image";
import { Globe, Workflow, Database, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { webDevAutomation } from "@/public/assets";

interface BundleProps {
  className?: string;
}

const WebsiteBundles = ({ className }: BundleProps) => {
  const t = useTranslations("HomePage.websiteBundles");

  return (
    <Section crosses className={cn("", className)} id="bundles">
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading
            tag={t("tag")}
            title={t("title")}
            text={t("subtitle")}
          />
        </div>

        {/* Value Proposition Pills */}
        <div className="-mx-5 md:-mx-10 lg:-mx-[3.75rem]">
          <div
            className="flex sm:justify-center mb-6 sm:mb-8 lg:mb-10 animate-bundle-benefits px-5 md:px-10 lg:px-[3.75rem]"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative w-full sm:max-w-4xl text-center">
              <div className="flex flex-col sm:flex-row flex-wrap sm:justify-center gap-3 sm:gap-4 lg:gap-6">
              {[
                { icon: Globe, text: t("valueProps.modernWeb") },
                { icon: Database, text: t("valueProps.smartAutomation") },
                { icon: Workflow, text: t("valueProps.endToEnd") },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-auto flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-n-7 rounded-xl sm:rounded-2xl hover:bg-n-6 hover:scale-105 transition-all duration-300 animate-bundle-pill"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-color-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-n-1 whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Single Powerhouse Card */}
        <div className="relative max-w-7xl mx-auto">
             {/* Gradient Border Wrapper */}
             <div className="relative p-[1px] bg-gradient-to-br from-color-1 via-color-2 to-color-1 rounded-[2.5rem] animate-bundle-card shadow-2xl shadow-color-1/10">
                <div className="relative bg-n-8 rounded-[2.5rem] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                        
                        {/* Left Content */}
                        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative z-20">
                             <h3 className="h3 mb-4 sm:mb-6 bg-gradient-to-r from-n-1 to-n-3 bg-clip-text text-transparent">
                                {t("singleCard.title")}
                             </h3>
                             <p className="body-1 text-n-3 mb-5 sm:mb-6 leading-relaxed">
                                {t("singleCard.description")}
                             </p>
                             
                             <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {[0, 1, 2, 3].map((index) => (
                                    <li key={index} className="flex items-start gap-3 sm:gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-color-1/20 to-color-2/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-color-1" />
                                        </div>
                                        <span className="text-base sm:text-lg text-n-1 group-hover:text-color-1 transition-colors duration-300">
                                            {t(`singleCard.features.${index}`)}
                                        </span>
                                    </li>
                                ))}
                             </ul>
                             
                             <div className="mt-auto pt-2 sm:pt-4">
                                <Button href="#contact" className="w-full sm:w-auto px-8 sm:px-12">
                                    {t("singleCard.cta")}
                                </Button>
                             </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-[280px] sm:h-[350px] lg:h-auto overflow-hidden">
                            {/* Desktop Overlay Gradient for smooth text overlay protection */}
                            <div className="absolute inset-0 bg-gradient-to-r from-n-8 via-n-8/50 to-transparent z-10 hidden lg:block translate-x-[-1px]"></div>
                            
                            {/* Mobile Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-n-8 via-transparent to-transparent z-10 lg:hidden"></div>

                            <Image 
                                src={webDevAutomation} 
                                alt="Web Development and Automation" 
                                fill
                                className="object-cover object-center lg:object-left scale-105 hover:scale-100 transition-transform duration-[20s] ease-out"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Ambient Glows */}
                <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-color-1/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen"></div>
                <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-color-2/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen"></div>
             </div>
        </div>

      </div>
    </Section>
  );
};

export default WebsiteBundles;
