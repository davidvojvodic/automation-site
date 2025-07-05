"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomButton from "./Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Section from "./Section";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Create validation schema with translations
const createContactFormSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(2, t("validation.firstNameMin")),
    lastName: z.string().min(2, t("validation.lastNameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    company: z.string().min(2, t("validation.companyRequired")),
    website: z
      .string()
      .url(t("validation.websiteInvalid"))
      .optional()
      .or(z.literal("")),
    industry: z.string().min(2, t("validation.industryRequired")),
    bundleInterest: z.boolean().optional(),
    message: z.string().min(10, t("validation.messageMin")),
  });

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website?: string;
  industry: string;
  bundleInterest?: boolean;
  message: string;
};

export interface ContactProps {
  className?: string;
}

export function Contact({ className }: ContactProps) {
  const t = useTranslations("HomePage.contact");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFormSchema = createContactFormSchema(t);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      website: "",
      industry: "",
      bundleInterest: false,
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const formDataWithLocale = {
        ...values,
        language: locale,
      };

      console.log("Form submission:", formDataWithLocale);

      // Send to API route which forwards to n8n
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithLocale),
      });

      if (response.ok) {
        toast.success(t("messages.success"), {
          description:
            locale === "sl"
              ? "Preverili bomo vašo poizvedbo in se vam kmalu oglasili z brezplačno analizo."
              : "We'll review your inquiry and get back to you soon with your free analysis.",
          duration: 5000,
        });
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t("messages.error"), {
        description:
          locale === "sl"
            ? "Prosimo, poskusite znova ali nas kontaktirajte direktno."
            : "Please try again or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section crosses className={cn(className)} id="contact">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-contact-header">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{t("title")}</h2>
            <p className="text-sm sm:text-base lg:text-lg text-n-4">{t("subtitle")}</p>
          </div>

          {/* Form */}
          <div
            className="relative bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden animate-contact-form"
            style={{ animationDelay: "200ms" }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-color-1/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Basic Contact Info */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-contact-fields"
                    style={{ animationDelay: "400ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.firstName")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.firstNamePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-9 sm:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.lastName")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.lastNamePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-9 sm:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-contact-fields"
                    style={{ animationDelay: "600ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.email")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("form.emailPlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-9 sm:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.company")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.companyPlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-9 sm:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-contact-fields"
                    style={{ animationDelay: "800ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.industry")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.industryPlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-9 sm:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.website")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder={t("form.websitePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-9 sm:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bundle Interest Checkbox */}
                  <div
                    className="animate-contact-fields"
                    style={{ animationDelay: "1000ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="bundleInterest"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-n-6 data-[state=checked]:bg-color-1 data-[state=checked]:border-color-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-n-1 font-medium cursor-pointer">
                              {t("form.bundleInterest")}
                            </FormLabel>
                            <p className="text-xs sm:text-sm text-n-4">
                              {t("form.bundleInterestDescription")}
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Guidance Notice */}
                  <div
                    className="animate-contact-fields"
                    style={{ animationDelay: "1100ms" }}
                  >
                    <div className="bg-color-1/5 border border-color-1/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-color-1 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-n-1 mb-1.5 sm:mb-2">
                            {locale === "sl"
                              ? "💡 Nasveti za boljšo ponudbo:"
                              : "💡 Tips for a better offer:"}
                          </h4>
                          <ul className="text-[11px] sm:text-xs text-n-3 space-y-0.5 sm:space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="text-color-1">•</span>
                              <span>
                                {locale === "sl"
                                  ? 'Opišite vaše največje časovne izzive (npr. "Preveč časa porabimo za ročno vnašanje računov")'
                                  : 'Describe your biggest time challenges (e.g., "We spend too much time manually entering invoices")'}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-color-1">•</span>
                              <span>
                                {locale === "sl"
                                  ? "Omenite trenutne procese, ki so ponavljajoči (rezervacije, obvestila, poročila)"
                                  : "Mention current repetitive processes (bookings, notifications, reports)"}
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-color-1">•</span>
                              <span>
                                {locale === "sl"
                                  ? "Navedite približno število ur tedensko, ki jih porabite za administracijo"
                                  : "Indicate roughly how many hours per week you spend on admin tasks}"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div
                    className="animate-contact-fields"
                    style={{ animationDelay: "1200ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base text-n-1">
                            {t("form.message")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("form.messagePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 min-h-[100px] sm:min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div
                    className="text-center pt-6 sm:pt-8 animate-contact-submit"
                    style={{ animationDelay: "1400ms" }}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <CustomButton
                        onClick={(e) => {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }}
                        className="w-full sm:w-auto min-w-[200px] sm:min-w-[280px] text-sm sm:text-base hover:scale-105 transition-transform duration-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {locale === "sl" ? "Pošiljanje..." : "Sending..."}
                          </span>
                        ) : (
                          t("form.submitButton")
                        )}
                      </CustomButton>
                      <p className="text-[11px] sm:text-xs text-n-5 max-w-md">
                        {t("form.privacyNote")}
                      </p>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            {/* Trust Indicators */}
            <div
              className="text-center mt-10 relative z-10 animate-contact-trust"
              style={{ animationDelay: "1600ms" }}
            >
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 lg:gap-8 text-n-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-n-7/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-n-6/50">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.freeConsultation")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-n-7/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-n-6/50">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.noObligation")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-n-7/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-n-6/50">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.gdprCompliant")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
