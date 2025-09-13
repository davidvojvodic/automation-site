"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

interface LanguageSwitcherProps {
  className?: string;
  locale: string;
}

const languageNames: Record<string, string> = {
  en: "EN",
  sl: "SL",
  // hr: "HR", // Temporarily disabled
};

const languageFullNames: Record<string, string> = {
  en: "English",
  sl: "Slovenščina",
  // hr: "Hrvatski", // Temporarily disabled
};

// ISO 3166-1 alpha-2 country codes for flags
const languageCountryCodes: Record<string, string> = {
  en: "GB", // Great Britain flag for English
  sl: "SI", // Slovenia flag
  // hr: "HR", // Croatia flag - Temporarily disabled
};

export function LanguageSwitcher({ className, locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    // Use next-intl router which handles locale switching properly
    router.push(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-n-1/50 hover:text-n-1 transition-colors font-code text-xs font-semibold uppercase"
      >
        <ReactCountryFlag
          countryCode={languageCountryCodes[locale]}
          svg
          style={{
            width: '1.25em',
            height: '1.25em',
          }}
          title={languageFullNames[locale]}
        />
        {languageNames[locale]}
        <svg
          className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")}
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-n-8 border border-n-6 rounded-lg shadow-lg overflow-hidden">
          {locales.map((lng) => (
            <button
              key={lng}
              onClick={() => handleLanguageChange(lng)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-n-7 transition-colors flex items-center gap-3",
                locale === lng ? "text-n-1 bg-n-7" : "text-n-3"
              )}
            >
              <ReactCountryFlag
                countryCode={languageCountryCodes[lng]}
                svg
                style={{
                  width: '1.25em',
                  height: '1.25em',
                }}
                title={languageFullNames[lng]}
              />
              {languageFullNames[lng]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;