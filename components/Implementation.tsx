"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import Heading from "./Heading";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ClipboardList, Settings, Rocket } from "lucide-react";

interface ImplementationProps {
  className?: string;
}

function Implementation({ className }: ImplementationProps) {
  const t = useTranslations("HomePage.implementation");

  const steps = [
    {
      id: 1,
      key: "step1",
      icon: Search,
    },
    {
      id: 2,
      key: "step2",
      icon: ClipboardList,
    },
    {
      id: 3,
      key: "step3",
      icon: Settings,
    },
    {
      id: 4,
      key: "step4",
      icon: Rocket,
    },
  ];

  return (
    <Section crosses className={cn(className)} id="process">
      <div className="container">
        <div className="animate-process-heading">
          <Heading tag={t("tag")} title={t("title")} text={t("subtitle")} />
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto relative">
          {/* Simple gradient connecting line */}
          <div
            className="absolute top-36 left-0 right-0 h-1 bg-gradient-to-r from-color-1 via-color-2 to-color-3 rounded-full z-0 animate-process-line"
            style={{ animationDelay: "300ms" }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative animate-process-step"
                style={{ animationDelay: `${500 + index * 200}ms` }}
              >
                {/* Step Card */}
                <Card className="border-n-6 bg-n-8 hover:bg-n-7 hover:border-color-1/30 hover:scale-105 transition-all duration-500 group relative">
                  {/* Enhanced hover */}
                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-color-1/10 border border-color-1/30 text-color-1 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm group-hover:bg-color-1/20 group-hover:border-color-1/50 transition-all duration-300">
                      {t("stepLabel")} {step.id}
                    </div>
                  </div>

                  <CardHeader className="text-center pb-3">
                    <div className="flex justify-center items-center gap-2 mb-3">
                      <step.icon className="w-8 h-8 text-color-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                    </div>
                    <div className="flex justify-center gap-2 mb-3">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-color-1/20 text-color-1 border-color-1/30"
                      >
                        {t(`${step.key}.status`)}
                      </Badge>
                    </div>
                    <CardTitle className="text-n-1 group-hover:text-color-1 transition-colors">
                      {t(`${step.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-n-3 text-center text-sm">
                      {t(`${step.key}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Vertical with animations */}
        <div className="lg:hidden relative max-w-md mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-color-1 via-color-2 to-color-3 rounded-full overflow-hidden">
            <div className="absolute inset-0 w-1 bg-gradient-to-b from-color-1 to-color-2 rounded-full animate-pulse" />
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-start">
                {/* Mobile timeline circle */}
                <div className="absolute left-6 -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-color-1 to-color-2 rounded-full animate-ping opacity-30" />
                    <div className="relative w-10 h-10 bg-gradient-to-br from-color-1 to-color-2 rounded-full flex items-center justify-center border-3 border-n-8 shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {step.id}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-n-8 rounded-full flex items-center justify-center border-2 border-color-1">
                      <step.icon className="w-3 h-3 text-color-1" />
                    </div>
                  </div>
                </div>

                {/* Mobile content card */}
                <div className="ml-12 flex-1">
                  <Card className="border-n-6 bg-n-8/80 backdrop-blur-sm hover:bg-n-8/90 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-color-1/20 text-color-1 border-color-1/30 text-xs"
                        >
                          {t(`${step.key}.status`)}
                        </Badge>
                      </div>
                      <CardTitle className="text-n-1">
                        {t(`${step.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-n-3 leading-relaxed">
                        {t(`${step.key}.description`)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="flex justify-center mt-16 animate-process-cta"
          style={{ animationDelay: "1300ms" }}
        >
          <div className="text-center">
            <div className="tagline mb-4">{t("ctaTitle")}</div>
            <button className="button hover:scale-105 transition-transform duration-300">
              {t("ctaButton")}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Implementation;
