import React, { HTMLAttributes } from "react";
import { companyLogos } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useTranslations } from "next-intl";

interface CompanyLogosProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CompanyLogos({ className, ...props }: CompanyLogosProps) {
  const t = useTranslations("HomePage.companyLogos");

  return (
    <aside className={cn("py-8 border-y border-n-6/30 bg-n-8/40", className)} aria-label="Trusted companies" {...props}>
      <h3 className="tagline mb-6 text-center text-n-1/50 uppercase tracking-widest text-sm font-semibold">{t("tagline") || "Trusted By"}</h3>
      <Marquee
        speed={30}
        gradient={true}
        gradientColor="#0E0C15"
        gradientWidth={120}
        pauseOnHover={false}
      >
        {companyLogos.map((logo: string, index: number) => (
          <div
            className="flex items-center justify-center mx-4 md:mx-6 h-[3.5rem] md:h-16"
            key={index}
          >
            <Image
              src={logo}
              width={120}
              height={40}
              alt={`Integration logo ${index}`}
              className="object-contain max-h-7 max-w-7 md:max-h-8 md:max-w-8 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </Marquee>
    </aside>
  );
}

export default CompanyLogos;
