"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import Heading from "./Heading";
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
  const steps: Step[] = [
    {
      id: 1,
      icon: Search,
      title: "Discovery & Risk Assessment",
      status: "Phase 1",
      description: "Comprehensive analysis of your current systems and workflows with no commitment required. We identify automation opportunities and assess risks before any implementation begins.",
      outcome: "Clear roadmap with identified opportunities and protected investments"
    },
    {
      id: 2,
      icon: Target,
      title: "Strategic Planning & Architecture",
      status: "Phase 2",
      description: "Design the technical architecture and implementation strategy based on discovery findings. We create detailed blueprints with fallback plans before any development begins.",
      outcome: "Technical architecture blueprint with defined success metrics"
    },
    {
      id: 3,
      icon: Settings,
      title: "Controlled Implementation & Testing",
      status: "Phase 3",
      description: "Build and deploy automation systems in a controlled environment with comprehensive testing. We implement with continuous monitoring and rollback capabilities to ensure zero business disruption.",
      outcome: "Fully functional automation systems validated through testing"
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "Launch & Team Training",
      status: "Phase 4",
      description: "Full system deployment with comprehensive team training and knowledge transfer. Your team becomes autonomous with the new automation systems through hands-on training and documentation.",
      outcome: "Fully operational automation system with confident, trained team"
    },
  ];

  return (
    <Section crosses className={cn(className)} id="process">
      <div className="container">
        <div className="animate-process-heading">
          <Heading
            tag="Proven Process"
            title="Our Delivery Process"
            text="Systematic approach that ensures your automation projects deliver results without disrupting your business"
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
                <AccordionTrigger className="px-6 py-6 hover:no-underline group">
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

                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 ml-16">
                    {/* Description */}
                    <p className="text-n-3 text-left leading-relaxed">
                      {step.description}
                    </p>

                    {/* Phase Outcome */}
                    <div className="bg-n-7 rounded-lg p-4 border-l-4 border-color-1">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-color-1 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-color-1 uppercase tracking-wide">
                          Phase Outcome
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
