"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import Heading from "./Heading";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, Target, Settings, TrendingUp, CheckCircle } from "lucide-react";

interface ImplementationProps {
  className?: string;
}

interface Step {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  status: string;
  description: string;
  outcome: string;
}

function Implementation({ className }: ImplementationProps) {
  const t = useTranslations("HomePage.implementation");

  const steps: Step[] = [
    {
      id: 1,
      icon: Search,
      title: t("phase1.title"),
      status: t("labels.phase1"),
      description: t("phase1.description"),
      outcome: t("phase1.outcome")
    },
    {
      id: 2,
      icon: Target,
      title: t("phase2.title"),
      status: t("labels.phase2"),
      description: t("phase2.description"),
      outcome: t("phase2.outcome")
    },
    {
      id: 3,
      icon: Settings,
      title: t("phase3.title"),
      status: t("labels.phase3"),
      description: t("phase3.description"),
      outcome: t("phase3.outcome")
    },
    {
      id: 4,
      icon: TrendingUp,
      title: t("phase4.title"),
      status: t("labels.phase4"),
      description: t("phase4.description"),
      outcome: t("phase4.outcome")
    },
  ];

  // Generate FAQ structured data for automation implementation
  const generateFAQStructuredData = () => {
    const faqs = [
      { question: t("faq.question1"), answer: t("faq.answer1") },
      { question: t("faq.question2"), answer: t("faq.answer2") },
      { question: t("faq.question3"), answer: t("faq.answer3") },
      { question: t("faq.question4"), answer: t("faq.answer4") },
      { question: t("faq.question5"), answer: t("faq.answer5") },
      { question: t("faq.question6"), answer: t("faq.answer6") }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  };

  return (
    <Section crosses className={cn(className)} id="implementation">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQStructuredData())
        }}
      />
      <div className="container">
        <div className="animate-process-heading">
          <Heading
            tag={t("tag")}
            title={t("title")}
            text={t("description")}
          />
        </div>

        {/* Implementation Process Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {steps.map((step, index) => (
              <AccordionItem
                key={step.id}
                value={`phase-${step.id}`}
                className={cn(
                  "border border-n-6 bg-n-8 rounded-2xl overflow-hidden",
                  "hover:border-color-1/30 transition-all duration-300",
                  "animate-process-step"
                )}
                style={{ animationDelay: `${300 + index * 150}ms` }}
              >
                <AccordionTrigger className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 hover:no-underline group">
                  <div className="flex items-center gap-4 text-left w-full">
                    {/* Phase Icon and Number */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-color-1 to-color-2 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {step.id}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-n-8 rounded-full flex items-center justify-center border-2 border-color-1">
                          <step.icon className="w-3 h-3 text-color-1" />
                        </div>
                      </div>
                    </div>

                    {/* Phase Title and Status */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge
                          variant="secondary"
                          className="bg-color-1/20 text-color-1 border-color-1/30 text-xs"
                        >
                          {step.status}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-n-1 group-hover:text-color-1 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6">
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-n-3 text-left leading-relaxed">
                      {step.description}
                    </p>

                    {/* Phase Outcome */}
                    <div className="bg-n-7 rounded-lg p-4 border-l-4 border-color-1">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-color-1 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-color-1 uppercase tracking-wide">
                          {t("labels.phaseOutcome")}
                        </span>
                      </div>
                      <p className="text-base font-medium text-n-1 leading-relaxed">
                        {step.outcome}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </Section>
  );
}

export default Implementation;
