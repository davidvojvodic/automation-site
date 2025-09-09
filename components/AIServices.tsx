import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { 
  Workflow, 
  Bot, 
  Target,
  Zap,
  TrendingUp,
  Building2,
  Mic,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIServicesProps {
  className?: string;
}

// Icon mapping for the automation systems
const iconMap = {
  Search,
  TrendingUp,
  Target,
  Bot,
  Mic,
  Zap,
} as const;

type IconName = keyof typeof iconMap;


const AIServices = ({ className }: AIServicesProps) => {

  // Flowko Automation Systems from Services.tsx
  const automationSystems = [
    {
      id: "lead-generation",
      icon: "Search" as IconName,
      title: "Lead Generation Systems",
      subtitle: "Multi-Source Data + AI-Powered Prospecting",
      description: "Automated prospect identification and qualification systems using multi-source data enrichment and AI-powered outreach workflows. Advanced targeting algorithms combined with intelligent contact sequencing for consistent business development.",
      outcome: "Consistent qualified prospects",
      capabilities: [
        "Multi-platform data aggregation and enrichment",
        "AI-powered prospect qualification scoring",
        "Personalized outreach campaign orchestration",
        "Real-time lead scoring with behavioral triggers",
        "Automated contact sequencing workflows"
      ],
      badge: "Lead Gen",
      techStack: ["n8n", "OpenAI GPT-4", "LinkedIn API", "HubSpot"],
      applications: ["B2B prospecting", "Lead qualification", "Sales outreach", "CRM integration"],
      popular: true,
    },
    {
      id: "sales-automation",
      icon: "TrendingUp" as IconName,
      title: "Sales Process Automation",
      subtitle: "AI Proposals + CRM Integration",
      description: "Complete sales process automation with AI-powered proposal generation, lead scoring, and CRM workflows. Our system creates dynamic proposals and manages your entire sales pipeline automatically.",
      outcome: "Streamlined sales pipeline",
      capabilities: [
        "Intelligent proposal generation with dynamic pricing",
        "Advanced lead scoring models with automation",
        "Automated follow-up orchestration workflows",
        "Sales asset generation and optimization",
        "Seamless CRM integration and synchronization"
      ],
      badge: "Sales AI",
      techStack: ["n8n", "Claude 3", "Salesforce API", "DocuSign"],
      applications: ["Proposal automation", "Pipeline management", "CRM workflows", "Sales analytics"],
      popular: false,
    },
    {
      id: "ai-content-systems",
      icon: "Target" as IconName,
      title: "AI Content & UGC Systems",
      subtitle: "OpenAI + Character-Consistent Branding",
      description: "AI-powered content creation with character-consistent UGC campaigns. Generate blog posts, social content, and marketing materials while maintaining perfect brand consistency across all channels.",
      outcome: "Brand-consistent content at scale",
      capabilities: [
        "AI-driven content creation with brand algorithms",
        "Multi-format content optimization workflows",
        "Automated content calendar management",
        "SEO optimization and keyword integration",
        "Multi-channel distribution automation"
      ],
      badge: "Content AI",
      techStack: ["n8n", "OpenAI GPT-4", "DALL-E 3", "Buffer API"],
      applications: ["Content creation", "Social media", "SEO optimization", "Brand management"],
      popular: false,
    },
    {
      id: "conversion-optimization",
      icon: "Bot" as IconName,
      title: "Conversion Optimization",
      subtitle: "Predictive Scoring + AI Nurturing",
      description: "Advanced conversion optimization using predictive lead scoring and AI-powered nurture sequences. Our machine learning models identify high-value prospects and automatically nurture them with personalized multi-channel campaigns.",
      outcome: "Higher conversion rates",
      capabilities: [
        "Predictive scoring algorithms for qualification",
        "AI-driven nurture sequence optimization",
        "Dynamic messaging adaptation workflows",
        "Behavioral pattern analysis automation",
        "Multi-channel campaign trigger systems"
      ],
      badge: "Conversion",
      techStack: ["n8n", "TensorFlow", "Mixpanel", "Mailchimp"],
      applications: ["Lead nurturing", "Email campaigns", "Behavioral tracking", "A/B testing"],
      isPremium: true,
      popular: false,
    },
    {
      id: "voice-ai-agents",
      icon: "Mic" as IconName,
      title: "Voice & AI Agent Systems",
      subtitle: "ElevenLabs + 24/7 Multilingual Support",
      description: "24/7 AI voice agents with 29-language support for customer service, appointment booking, and sales support. Our integration provides natural conversations that feel human while handling routine tasks automatically.",
      outcome: "24/7 intelligent voice support",
      capabilities: [
        "Natural conversation processing with AI",
        "29-language support with native accents",
        "Intelligent call routing and escalation",
        "Appointment scheduling automation workflows",
        "CRM integration with conversation tracking"
      ],
      badge: "Voice AI",
      techStack: ["n8n", "ElevenLabs", "Whisper API", "Calendly"],
      applications: ["Customer service", "Appointment booking", "Sales calls", "Support tickets"],
      isPremium: true,
      popular: false,
    },
    {
      id: "digital-transformation",
      icon: "Zap" as IconName,
      title: "Complete Digital Transformation",
      subtitle: "End-to-End Automation + Custom Development",
      description: "Complete digital ecosystem transformation with custom web applications, real-time analytics dashboards, and integrated AI workflows. End-to-end automation connecting all business systems with predictive analytics and ML forecasting.",
      outcome: "Complete digital ecosystem",
      capabilities: [
        "Custom dashboard development and analytics",
        "Comprehensive workflow automation architecture",
        "Intelligent system integration protocols",
        "Machine learning forecasting systems",
        "Performance monitoring and optimization"
      ],
      badge: "Enterprise",
      techStack: ["n8n", "React", "Python", "AWS", "Docker"],
      applications: ["Custom apps", "Analytics dashboards", "System integration", "ML forecasting"],
      isEnterprise: true,
      popular: false,
    },
  ];


  return (
    <Section crosses className={cn("", className)} id="ai-services">
      <div className="container relative z-2">
        {/* Header */}
        <div className="animate-bundle-heading">
          <Heading 
            title="Technical Implementation Systems" 
            text="Multi-platform automation architectures using open-source orchestration, AI language models, and voice synthesis technologies for workflow optimization" 
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
                { icon: Workflow, text: "Visual Workflow Design" },
                { icon: TrendingUp, text: "Multi-System Integration" },
                { icon: Building2, text: "Enterprise Scalability" },
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

        {/* Automation Systems Grid - 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {automationSystems.map((system, index) => {
            const IconComponent = iconMap[system.icon];
            
            return (
            <div
              key={system.id}
              className={cn(
                "relative p-6 sm:p-8 bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl overflow-hidden h-full flex flex-col",
                "hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/10",
                "hover:-translate-y-1",
                "transition-all duration-500 ease-out group",
                "animate-bundle-card",
                system.popular &&
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-transparent hover:from-color-1/10",
                system.isPremium &&
                  "border-color-6/50 bg-gradient-to-br from-color-6/5 to-transparent hover:from-color-6/10",
                system.isEnterprise &&
                  "border-color-4/50 bg-gradient-to-br from-color-4/5 to-transparent hover:from-color-4/10"
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
                          "w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-color-1/10 flex items-center justify-center group-hover:rotate-3 transition-all duration-300",
                          system.isPremium && "bg-color-6/10",
                          system.isEnterprise && "bg-color-4/10"
                        )}
                      >
                        <IconComponent className={cn(
                          "w-6 sm:w-7 h-6 sm:h-7 text-color-1",
                          system.isPremium && "text-color-6",
                          system.isEnterprise && "text-color-4"
                        )} />
                      </div>
                    </div>

                    {/* Badge */}
                    <div
                      className={cn(
                        "px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        system.popular && "bg-color-1 text-n-8",
                        system.isPremium && "bg-color-6 text-n-8",
                        system.isEnterprise && "bg-color-4 text-n-8",
                        !system.popular &&
                          !system.isPremium &&
                          !system.isEnterprise &&
                          "bg-n-6 text-n-3"
                      )}
                    >
                      {system.badge}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-n-1 mb-2 group-hover:text-color-1 transition-colors duration-300">
                      {system.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-color-1 font-medium mb-3">
                      {system.subtitle}
                    </p>
                    <p className="text-sm text-n-4 group-hover:text-n-3 transition-colors duration-300 leading-relaxed">
                      {system.description}
                    </p>
                  </div>
                </div>


                {/* Key Capabilities */}
                <div className="mb-4 flex-1">
                  <h4 className="text-xs font-bold text-n-1 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Workflow className="w-3 h-3 text-color-1" />
                    Key Capabilities
                  </h4>
                  <div className="space-y-1">
                    {system.capabilities.map(
                      (capability: string, capIndex: number) => (
                        <div
                          key={capIndex}
                          className="flex items-start gap-2 text-xs"
                        >
                          <div className="w-1.5 h-1.5 bg-color-1 rounded-full flex-shrink-0 mt-1.5"></div>
                          <span className="text-n-2 leading-relaxed">{capability}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Implementation Outcome */}
                <div className="mt-auto">
                  <div
                    className={cn(
                      "p-3 rounded-lg border-l-4 bg-gradient-to-r",
                      system.isPremium
                        ? "border-color-6 from-color-6/10 to-transparent"
                        : system.isEnterprise
                        ? "border-color-4 from-color-4/10 to-transparent"
                        : "border-color-1 from-color-1/10 to-transparent"
                    )}
                  >
                    <p className="text-xs font-bold text-n-1 mb-1">
                      System Outcome
                    </p>
                    <p
                      className={cn(
                        "text-sm font-bold",
                        system.isPremium
                          ? "text-color-6"
                          : system.isEnterprise
                          ? "text-color-4"
                          : "text-color-1"
                      )}
                    >
                      {system.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-all duration-500",
                  system.isPremium
                    ? "from-color-6/10 group-hover:from-color-6/20"
                    : system.isEnterprise
                    ? "from-color-4/10 group-hover:from-color-4/20"
                    : "from-color-1/10 group-hover:from-color-1/20"
                )}
              ></div>

            </div>
          );
        })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-12 sm:mt-16 lg:mt-20 animate-bundle-bottom-cta"
          style={{ animationDelay: "1400ms" }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-n-4 mb-6">
              Explore automation architecture implementations and workflow orchestration methodologies. Technical consultation available for custom integration requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 text-base" href="#contact">
                Technical Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AIServices;