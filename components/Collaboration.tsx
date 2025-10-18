import React from "react";
import { check, flowkoSymbol } from "@/public/assets";
import { collabApps } from "@/lib/constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface CollabContentItem {
  id: string | number;
  title: string;
  text?: string;
}

export interface CollabAppItem {
  id: string | number;
  title: string;
  icon: StaticImageData;
  width: number;
  height: number;
}

export interface CollaborationProps {
  className?: string;
}

export function Collaboration({ className }: CollaborationProps) {
  const t = useTranslations("HomePage.collaboration");

  return (
    <Section className={cn(className)}>
      <div className={cn("container lg:flex")}>
        <div className="max-w-[45rem]">
          <h2 className="font-bold text-[1.5rem] leading-[2.25rem] md:text-[1.75rem] md:leading-[2.25rem] lg:text-[2rem] lg:leading-[3rem] xl:text-[2.5rem] xl:leading-tight mb-4 sm:mb-6 md:mb-8">
            {t("title")}
          </h2>
          <ul className="max-w-[22rem] mb-8 sm:mb-10 md:mb-14">
            {["feature1", "feature2", "feature3"].map((key) => (
              <li className="mb-2 sm:mb-3 py-2 sm:py-3" key={key}>
                <div className="flex items-center">
                  <Image
                    src={check}
                    width={24}
                    height={24}
                    alt="check"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <h6 className="text-base sm:text-lg lg:text-xl font-bold ml-3 sm:ml-5">
                    {t(`features.${key}.title`)}
                  </h6>
                </div>
                <p className="text-sm sm:text-base mt-2 sm:mt-3 text-n-4 leading-relaxed">
                  {t(`features.${key}.text`)}
                </p>
              </li>
            ))}
          </ul>

          <Button href="#process" className="text-sm sm:text-base">
            {t("buttonText")}
          </Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-8 sm:mt-6 lg:mt-4">
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto leading-relaxed">
            {t("description")}
          </p>

          <div
            className={cn(
              "relative left-1/2 flex w-[18rem] sm:w-[20rem] md:w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-90 sm:scale-95 md:scale-100"
            )}
          >
            <div className="flex w-48 sm:w-52 md:w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[5rem] sm:w-[5.5rem] md:w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <Image
                    src={flowkoSymbol}
                    width={48}
                    height={48}
                    alt="flowko"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  />
                </div>
              </div>
            </div>

            <ul>
              {(collabApps as CollabAppItem[]).map((app, index) => (
                <li
                  key={app.id}
                  className={cn(
                    "absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom",
                    `rotate-${index * 45}`
                  )}
                >
                  <div
                    className={cn(
                      "relative -top-[1.3rem] sm:-top-[1.5rem] md:-top-[1.6rem] flex w-[2.5rem] h-[2.5rem] sm:w-[2.8rem] sm:h-[2.8rem] md:w-[3.2rem] md:h-[3.2rem] bg-n-7 border border-n-1/15 rounded-lg sm:rounded-xl",
                      `-rotate-${index * 45}`
                    )}
                  >
                    <Image
                      className="m-auto w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Collaboration;
