import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  ecommerceIcon,
  businessIcon,
  serviceIcon,
  portfolioIcon,
} from "@/public/assets";

interface BundleProps {
  className?: string;
}

const WebsiteBundles = ({ className }: BundleProps) => {
  const t = useTranslations("HomePage.bundles");

  const bundles = [
    {
      id: "ecommerce",
      icon: ecommerceIcon,
      title: t("ecommerce.title"),
      description: t("ecommerce.description"),
      price: "€7,000",
      roi: t("ecommerce.roi"),
      features: [
        t("ecommerce.features.0"),
        t("ecommerce.features.1"),
        t("ecommerce.features.3"),
        t("ecommerce.features.4"),
      ],
      highlight: true,
    },
    {
      id: "business",
      icon: businessIcon,
      title: t("business.title"),
      description: t("business.description"),
      price: "€5,500",
      roi: t("business.roi"),
      features: [
        t("business.features.0"),
        t("business.features.1"),
        t("business.features.2"),
        t("business.features.3"),
      ],
    },
    {
      id: "service",
      icon: serviceIcon,
      title: t("service.title"),
      description: t("service.description"),
      price: "€4,500",
      roi: t("service.roi"),
      features: [
        t("service.features.0"),
        t("service.features.1"),
        t("service.features.2"),
        t("service.features.3"),
      ],
    },
    {
      id: "professional",
      icon: portfolioIcon,
      title: t("professional.title"),
      description: t("professional.description"),
      price: "€4,000",
      roi: t("professional.roi"),
      features: [
        t("professional.features.0"),
        t("professional.features.1"),
        t("professional.features.2"),
        t("professional.features.3"),
      ],
    },
  ];

  return (
    <Section crosses className={cn("overflow-hidden", className)} id="bundles">
      <div className="container relative z-2">
        <div className="animate-bundle-heading">
          <Heading tag={t("tag")} title={t("title")} text={t("subtitle")} />
        </div>

        {/* Value Proposition */}
        <div
          className="flex justify-center mb-16 animate-bundle-benefits"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative max-w-4xl text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[t("benefits.0"), t("benefits.1"), t("benefits.2")].map(
                (benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 py-3 bg-n-7 rounded-2xl hover:bg-n-6 hover:scale-105 transition-all duration-300 animate-bundle-pill"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="w-3 h-3 bg-color-1 rounded-full animate-pulse"></div>
                    <span className="body-2 text-n-1">{benefit}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bundle Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {bundles.map((bundle, index) => (
            <div
              key={bundle.id}
              className={cn(
                "relative p-6 lg:p-8 bg-n-8 border border-n-6 rounded-3xl overflow-hidden h-full flex flex-col",
                "hover:border-color-1/40 hover:shadow-2xl hover:shadow-color-1/10",
                "hover:-translate-y-1",
                "transition-all duration-500 ease-out group cursor-pointer",
                "animate-bundle-card",
                bundle.highlight &&
                  "border-color-1/50 bg-gradient-to-br from-color-1/5 to-transparent hover:from-color-1/10"
              )}
              style={{ animationDelay: `${700 + index * 150}ms` }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 group-hover:rotate-3 transition-all duration-300">
                    <Image
                      src={bundle.icon}
                      width={64}
                      height={64}
                      alt={`${bundle.title} icon`}
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="relative mb-3">
                      <h3 className="h5 text-n-1 relative z-10 group-hover:text-color-1 transition-colors duration-300">
                        {bundle.title}
                      </h3>
                    </div>
                    <p className="body-2 text-n-4 group-hover:text-n-3 transition-colors duration-300">
                      {bundle.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8 flex-1">
                  <h4 className="text-sm font-bold text-n-1 uppercase tracking-wider mb-4">
                    {t("included")}
                  </h4>
                  <ul className="space-y-3">
                    {bundle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-color-1 mt-0.5 flex-shrink-0" />
                        <span className="body-2 text-n-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & CTA */}
                <div className="space-y-4 mt-auto">
                  <div>
                    {/* Popular tag on its own line for mobile */}
                    {bundle.highlight && (
                      <div className="flex justify-start mb-3 sm:hidden">
                        <div className="px-2.5 py-1 bg-color-1 rounded-full">
                          <span className="text-xs font-bold text-n-8 uppercase tracking-wider whitespace-nowrap">
                            {t("popular")}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-n-4">
                            {t("startingAt")}
                          </span>
                          <span className="h4 text-color-1">
                            {bundle.price}
                          </span>
                        </div>
                        <p className="text-xs text-color-1 font-medium">
                          {bundle.roi}
                        </p>
                      </div>
                      {/* Popular tag for desktop */}
                      {bundle.highlight && (
                        <div className="hidden sm:block px-2.5 py-1 bg-color-1 rounded-full">
                          <span className="text-xs font-bold text-n-8 uppercase tracking-wider whitespace-nowrap">
                            {t("popular")}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-n-4">{t("pricingNote")}</p>
                  </div>

                  <Button className="w-full" href="#contact">
                    {t("cta")}
                  </Button>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-color-1/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 group-hover:from-color-1/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16 animate-bundle-bottom-cta"
          style={{ animationDelay: "1400ms" }}
        >
          <p className="body-1 text-n-4 mb-6">{t("bottomText")}</p>
          <Button className="px-8" href="#contact">
            {t("bottomCta")}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default WebsiteBundles;
