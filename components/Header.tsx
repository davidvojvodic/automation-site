"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { flowko } from "@/public/assets";
import { navigation } from "@/lib/constants";
import Button from "./Button";
import MenuSvg from "@/public/assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
// import {Link} from '@/i18n/routing'; // Uncomment when needed
import LanguageSwitcher from "./LanguageSwitcher";

export interface HeaderProps {
  className?: string;
  locale?: string;
}

export function Header({ className, locale = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [openNavigation, setOpenNavigation] = useState(false);
  const t = useTranslations("HomePage.navigation");

  // Handle hash changes after hydration
  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    // Set initial hash
    updateHash();

    // Listen for hash changes
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    } else {
      setOpenNavigation(true);
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setOpenNavigation(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 border-b border-n-6/50",
        openNavigation ? "bg-n-8" : "bg-n-8/95 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 py-4 lg:py-5">
        <a className="block" href={`/${locale}`}>
          <Image
            src={flowko}
            width={120}
            height={45}
            alt="Flowko"
            className="lg:w-[140px] lg:h-[50px]"
          />
        </a>

        <nav
          className={cn(
            openNavigation ? "flex" : "hidden",
            "fixed top-[4.5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent"
          )}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {/* Navigation Links */}
            <div className="flex flex-col lg:flex-row items-center">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={cn(
                    "block relative transition-all duration-300",

                    // Mobile styles
                    "text-2xl font-code uppercase text-n-1 text-center",
                    "px-6 py-6 md:py-8",
                    item.url === hash || (item.url === pathname && !hash)
                      ? "text-color-1"
                      : "hover:text-color-1",
                    // Desktop styles
                    "lg:text-base lg:font-medium lg:normal-case lg:text-left lg:py-2 lg:px-8 xl:px-10",
                    // Desktop active/hover states
                    item.url === hash || (item.url === pathname && !hash)
                      ? "lg:text-color-1"
                      : "lg:text-n-3 lg:hover:text-n-1",
                    // Desktop underline effect
                    "lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-8 lg:after:right-8 xl:after:left-10 xl:after:right-10",
                    "lg:after:h-0.5 lg:after:bg-color-1 lg:after:transition-transform lg:after:duration-300 lg:after:origin-center",
                    item.url === hash || (item.url === pathname && !hash)
                      ? "lg:after:scale-x-100"
                      : "lg:after:scale-x-0 lg:hover:after:scale-x-100"
                  )}
                >
                  {t(item.title)}
                </a>
              ))}

              {/* Mobile CTA Button */}
              <div className="lg:hidden mt-8 px-6">
                <Button className="px-12" href="#contact" onClick={handleClick}>
                  {t("getStarted")}
                </Button>
              </div>
            </div>
          </div>

          <HamburgerMenu />
        </nav>

        {/* Language Switcher */}
        <LanguageSwitcher locale={locale} className="mr-4" />

        {/* Primary CTA Button - Desktop */}
        <Button className="hidden lg:flex ml-6" href="#contact">
          {t("getStarted")}
        </Button>

        {/* Mobile Menu Button */}
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
}

export default Header;
