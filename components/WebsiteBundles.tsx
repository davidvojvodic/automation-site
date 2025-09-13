import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { Zap, Globe, Workflow, ShoppingCart, Code, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface BundleProps {
  className?: string;
}

const WebsiteBundles = ({ className }: BundleProps) => {
  const solutions = [
    {
      id: "foundation",
      icon: Zap,
      title: "Foundation Bundle",
      subtitle: "Business Website + Core Automations",
      description: "Professional web presence with essential automation workflows to streamline customer interactions and lead management for service-based businesses.",
      outcome: "Professional digital presence with automated lead capture",
      idealFor: "Service businesses, consultants, agencies, professional services",
      capabilities: [
        "Professional responsive website (5-8 pages)",
        "Contact form automation with instant notifications",
        "Lead capture workflows and email sequences",
        "Google Analytics and tracking setup",
        "Basic CRM integration for lead management",
        "Monthly maintenance and hosting included"
      ],
      badge: "Essential",
      popular: false,
    },
    {
      id: "growth",
      icon: ShoppingCart,
      title: "Growth Bundle",
      subtitle: "E-commerce + Marketing Automation",
      description: "Complete online store with intelligent automation systems for inventory, orders, and customer lifecycle management to maximize sales and retention.",
      outcome: "Automated e-commerce operations with intelligent marketing",
      idealFor: "Product businesses, online retailers, physical stores going digital",
      capabilities: [
        "Full e-commerce store with payment processing",
        "Automated inventory management and low-stock alerts",
        "Order processing workflows and fulfillment automation",
        "Customer email campaigns and abandoned cart recovery",
        "Product recommendation and upselling automation",
        "Analytics dashboard with sales insights and reporting"
      ],
      badge: "Popular",
      popular: true,
    },
    {
      id: "dominator",
      icon: Code,
      title: "Dominator Bundle",
      subtitle: "Custom Web App + Advanced Automation",
      description: "Enterprise-grade web application development with custom automation architecture. Every project is uniquely scoped based on your technical requirements and business objectives through detailed consultation.",
      outcome: "Tailored digital ecosystem designed for your specific business model",
      idealFor: "SaaS startups, tech companies, businesses with complex operations",
      capabilities: [
        "Custom web application development tailored to your requirements",
        "Scalable user authentication, roles, and permission systems",
        "Multi-system workflow orchestration and API integrations",
        "Enterprise-grade analytics dashboards with real-time data",
        "Scalable architecture with monitoring and alerting"
      ],
      badge: "Premium",
      popular: false,
      isPremium: true,
    },
  ];

  return (
    <Section crosses className={cn("", className)} id="bundles">
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading
            tag="Web Development + Automation"
            title="Complete Digital Solutions" 
            text="Professional web development combined with intelligent automation systems to accelerate business growth and operational efficiency" 
          />
        </div>

        {/* Value Proposition Pills */}
        <div
          className="flex justify-center mb-8 sm:mb-12 lg:mb-16 animate-bundle-benefits"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative max-w-4xl text-center">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-8">
              {[
                { icon: Globe, text: "Modern Web Development" },
                { icon: Database, text: "Smart Automation Integration" },
                { icon: Workflow, text: "End-to-End Solutions" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-n-7 rounded-xl sm:rounded-2xl hover:bg-n-6 hover:scale-105 transition-all duration-300 animate-bundle-pill"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-color-1 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-n-1 whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <a
              href="#contact"
              key={solution.id}
              className={cn(
                "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                "hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/10",
                "hover:-translate-y-1",
                "transition-all duration-500 ease-out group cursor-pointer",
                "animate-bundle-card",
                solution.popular &&
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-transparent hover:from-color-1/10",
                solution.isPremium &&
                  "border-color-6/50 bg-gradient-to-br from-color-6/5 to-transparent hover:from-color-6/10"
              )}
              style={{ animationDelay: `${700 + index * 150}ms` }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Header with Icon, Badge, and Title */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                          solution.isPremium && "bg-color-6/10"
                        )}
                      >
                        {React.createElement(solution.icon, {
                          className: cn(
                            "w-7 sm:w-8 h-7 sm:h-8 text-color-1",
                            solution.isPremium && "text-color-6"
                          ),
                        })}
                      </div>
                    </div>

                    {/* Badge */}
                    <div
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        solution.popular && "bg-color-1 text-n-8",
                        solution.isPremium && "bg-color-6 text-n-8",
                        !solution.popular &&
                          !solution.isPremium &&
                          "bg-n-6 text-n-3"
                      )}
                    >
                      {solution.badge}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-n-1 mb-2 group-hover:text-color-1 transition-colors duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-sm sm:text-base text-color-1 font-medium mb-3">
                      {solution.subtitle}
                    </p>
                    <p className="text-sm text-n-4 group-hover:text-n-3 transition-colors duration-300 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                  <div className="text-xs text-n-4 uppercase tracking-wider mb-1">
                    Ideal For
                  </div>
                  <p className="text-sm text-n-2">
                    {solution.idealFor}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-bold text-n-1 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-color-1" />
                    Included Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {solution.capabilities.map(
                      (capability: string, capIndex: number) => (
                        <div
                          key={capIndex}
                          className="flex items-center gap-2 p-2 rounded-lg bg-n-7 group-hover:bg-n-6 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-color-1 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-n-1">{capability}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Success Outcome */}
                <div className="mt-auto">
                  <div
                    className={cn(
                      "p-4 rounded-xl border-l-4 bg-gradient-to-r",
                      solution.isPremium
                        ? "border-color-6 from-color-6/10 to-transparent"
                        : "border-color-1 from-color-1/10 to-transparent"
                    )}
                  >
                    <p className="text-sm font-bold text-n-1 mb-1">
                      Expected Outcome
                    </p>
                    <p
                      className={cn(
                        "text-lg font-bold",
                        solution.isPremium
                          ? "text-color-6"
                          : "text-color-1"
                      )}
                    >
                      {solution.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-all duration-500",
                  solution.isPremium
                    ? "from-color-6/10 group-hover:from-color-6/20"
                    : "from-color-1/10 group-hover:from-color-1/20"
                )}
              ></div>
            </a>
          ))}
        </div>


        {/* Bottom CTA */}
        <div
          className="text-center mt-12 sm:mt-16 lg:mt-20 animate-bundle-bottom-cta"
          style={{ animationDelay: "1400ms" }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-n-4 mb-6">
              Ready to transform your business with professional web development and intelligent automation? Let&apos;s discuss your project requirements and technical objectives.
            </p>
            <div className="flex justify-center">
              <Button className="px-8 text-base" href="#contact">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WebsiteBundles;
