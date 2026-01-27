"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import Heading from "./Heading";
import { useTranslations } from "next-intl";
import { Search, Settings, TrendingUp } from "lucide-react";

interface ImplementationProps {
  className?: string;
}

interface Step {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  status: string;
  subtitle: string;
  points: string[];
}

function Implementation({ className }: ImplementationProps) {
  const t = useTranslations("HomePage.implementation");

  const steps: Step[] = [
    {
      id: 1,
      icon: Search,
      title: t("phase1.title"),
      status: t("labels.phase1"),
      subtitle: t("phase1.subtitle"),
      points: [
        t("phase1.points.0"),
        t("phase1.points.1"),
        t("phase1.points.2")
      ]
    },
    {
      id: 2,
      icon: Settings,
      title: t("phase2.title"),
      status: t("labels.phase2"),
      subtitle: t("phase2.subtitle"),
      points: [
        t("phase2.points.0"),
        t("phase2.points.1"),
        t("phase2.points.2")
      ]
    },
    {
      id: 3,
      icon: TrendingUp,
      title: t("phase3.title"),
      status: t("labels.phase3"),
      subtitle: t("phase3.subtitle"),
      points: [
        t("phase3.points.0"),
        t("phase3.points.1"),
        t("phase3.points.2")
      ]
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
        <div className="animate-process-heading mb-10 md:mb-16">
          <Heading
            tag={t("tag")}
            title={t("title")}
            text={t("description")}
          />
        </div>

        {/* Implementation Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "group relative border border-n-6 bg-n-8 rounded-[2rem] p-8 flex flex-col h-full",
                "transition-all duration-300 hover:border-color-1/30 hover:shadow-2xl hover:shadow-color-1/10", 
                "animate-process-step"
              )}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              {/* Header: Icon & Number */}
              <div className="flex items-start justify-between mb-8">
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full border border-color-1 text-color-1 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-color-1 group-hover:text-n-8 group-hover:shadow-[0_0_20px_-5px_#AC6AFF]">
                  <step.icon className="w-6 h-6" />
                </div>
                
                {/* Number Badge */}
                <span className="text-xs font-bold text-color-1 bg-color-1/10 px-3 py-1 rounded-full border border-color-1/20">
                  {step.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-n-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-color-1 font-medium text-sm">
                  {step.subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-4">
                {step.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-n-4 mt-2 shrink-0 group-hover:bg-color-1 transition-colors duration-300" />
                    <p className="text-n-3 text-sm leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Implementation;
