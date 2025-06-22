"use client";

import React, { HTMLAttributes } from "react";
import Section from "./Section";
import { socials } from "@/lib/constants";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { flowko } from "@/public/assets";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const Footer = () => {
  const t = useTranslations("HomePage.footer");
  const currentYear = new Date().getFullYear();

  const openCookieSettings = () => {
    // Import and call the cookie settings function
    import("./CookieBanner").then((module) => {
      if (module.openCookieSettings) {
        module.openCookieSettings();
      }
    });
  };

  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container">
        {/* Company Information */}
        <div className="text-center flex flex-col gap-4 items-center justify-center mb-8 pb-8 border-b border-n-6">
          <a className="block" href="#hero">
            <Image src={flowko} width={180} height={70} alt="Flowko" />
          </a>
          <p className="body-2 text-n-4 mb-3">{t("contact.description")}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-n-4">
            <a
              href="mailto:info@flowko.io"
              className="caption hover:text-color-1 transition-colors"
            >
              {t("contact.email")}
            </a>
            <span className="hidden sm:block text-white">•</span>
            <span className="caption">{t("contact.location")}</span>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 pb-6 border-b border-n-6">
          <Link
            href="/privacy"
            className="caption text-n-4 hover:text-n-1 transition-colors"
          >
            {t("legal.privacy")}
          </Link>
          <Link
            href="/terms"
            className="caption text-n-4 hover:text-n-1 transition-colors"
          >
            {t("legal.terms")}
          </Link>
          <Link
            href="/cookies"
            className="caption text-n-4 hover:text-n-1 transition-colors"
          >
            {t("legal.cookies")}
          </Link>
          <Link
            href="/legal"
            className="caption text-n-4 hover:text-n-1 transition-colors"
          >
            {t("legal.legal")}
          </Link>
          <button
            onClick={openCookieSettings}
            className="caption text-n-4 hover:text-n-1 transition-colors bg-transparent border-none p-0 cursor-pointer"
          >
            {t("legal.cookieSettings")}
          </button>
        </div>

        {/* Main Footer Content */}
        <div className="flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
          <p className="caption text-n-4 lg:block">
            {t("copyright", { year: currentYear })}
          </p>

          <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              >
                <Image
                  src={item.iconUrl}
                  width={16}
                  height={16}
                  alt={item.title}
                />
              </a>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
