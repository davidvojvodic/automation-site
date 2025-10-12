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
import { MessageCircle, Shield, CheckCircle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";

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

export interface ContactFormProgressiveProps {
  className?: string;
}

export function ContactFormProgressive({ className }: ContactFormProgressiveProps) {
  const t = useTranslations("HomePage.contact");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentStep, totalSteps, nextStep, prevStep, isFirstStep, isLastStep, progress } =
    useMultiStepForm({ totalSteps: 3 });

  const contactFormSchema = createContactFormSchema(t);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
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

  // Validate current step before proceeding
  const validateStep = async () => {
    let fieldsToValidate: (keyof ContactFormValues)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email"];
        break;
      case 2:
        fieldsToValidate = ["company", "industry"];
        break;
      case 3:
        fieldsToValidate = ["message"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      nextStep();
    }
  };

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    const loadingToast = toast.loading(
      locale === "sl" ? "Pošiljanje..." : "Sending...",
      {
        description: locale === "sl"
          ? "Obdelujemo vašo zahtevo..."
          : "Processing your request...",
      }
    );

    try {
      const formDataWithLocale = {
        ...values,
        language: locale,
      };

      console.log("Form submission:", formDataWithLocale);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithLocale),
      });

      if (response.ok) {
        toast.success(t("messages.success"), {
          id: loadingToast,
          description:
            locale === "sl"
              ? "Preverili bomo vašo poizvedbo in se vam kmalu oglasili z brezplačno analizo."
              : "We'll review your inquiry and get back to you soon with your free analysis.",
          duration: 5000,
          icon: "🎉",
        });
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t("messages.error"), {
        id: loadingToast,
        description:
          locale === "sl"
            ? "Prosimo, poskusite znova ali nas kontaktirajte direktno."
            : "Please try again or contact us directly.",
        duration: 5000,
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return locale === "sl" ? "Osebni podatki" : "Personal Information";
      case 2:
        return locale === "sl" ? "Podatki o podjetju" : "Company Details";
      case 3:
        return locale === "sl" ? "Potrebe projekta" : "Project Requirements";
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return locale === "sl"
          ? "Povejte nam, kdo ste"
          : "Tell us who you are";
      case 2:
        return locale === "sl"
          ? "Kje delate?"
          : "Where do you work?";
      case 3:
        return locale === "sl"
          ? "Kaj potrebujete?"
          : "What do you need?";
      default:
        return "";
    }
  };

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
            className="relative bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden animate-contact-form"
            style={{ animationDelay: "200ms" }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-color-1/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-n-3">
                    {locale === "sl" ? "Korak" : "Step"} {currentStep} {locale === "sl" ? "od" : "of"} {totalSteps}
                  </span>
                </div>
                <div className="w-full bg-n-6 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-color-1 to-color-2 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Step Title */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-n-1 mb-2">
                  {getStepTitle()}
                </h3>
                <p className="text-sm sm:text-base text-n-4">
                  {getStepSubtitle()}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-5 sm:space-y-6 animate-fade-in">
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
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-11 sm:h-12"
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
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-11 sm:h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-11 sm:h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Company Details */}
                  {currentStep === 2 && (
                    <div className="space-y-5 sm:space-y-6 animate-fade-in">
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
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-11 sm:h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-11 sm:h-12"
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
                              {t("form.website")} {locale === "sl" ? "(neobvezno)" : "(optional)"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder={t("form.websitePlaceholder")}
                                {...field}
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 h-11 sm:h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Project Requirements */}
                  {currentStep === 3 && (
                    <div className="space-y-5 sm:space-y-6 animate-fade-in">
                      {/* Bundle Interest Checkbox */}
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

                      {/* Tips Section */}
                      <div className="bg-color-1/5 border border-color-1/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-color-1 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-n-1 mb-1.5 sm:mb-2">
                              {locale === "sl"
                                ? "💡 Nasveti za boljšo ponudbo:"
                                : "💡 Tips for a better offer:"}
                            </h4>
                            <ul className="text-xs sm:text-sm text-n-3 space-y-0.5 sm:space-y-1">
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
                                    : "Indicate roughly how many hours per week you spend on admin tasks"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
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
                                rows={5}
                                placeholder={t("form.messagePlaceholder")}
                                {...field}
                                className="bg-n-7 border-n-6 text-sm sm:text-base text-n-1 placeholder:text-n-4 min-h-[120px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-2 sm:gap-4 pt-6">
                    {!isFirstStep && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-n-1 hover:text-color-1 transition-colors flex-shrink-0"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {locale === "sl" ? "Nazaj" : "Back"}
                      </button>
                    )}

                    <div className="flex-1 flex justify-end min-w-0">
                      {!isLastStep ? (
                        <CustomButton
                          onClick={(e) => {
                            e.preventDefault();
                            handleNext();
                          }}
                          className="w-full sm:w-auto sm:min-w-[160px] text-sm sm:text-base"
                        >
                          {locale === "sl" ? "Naprej" : "Continue"}
                        </CustomButton>
                      ) : (
                        <CustomButton
                          onClick={(e) => {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }}
                          className="w-full sm:w-auto sm:min-w-[200px] text-xs sm:text-base px-4 sm:px-6"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2 justify-center">
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
                      )}
                    </div>
                  </div>

                  {isLastStep && (
                    <p className="text-xs sm:text-sm text-n-5 text-center pt-4">
                      {t("form.privacyNote")}
                    </p>
                  )}
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
                  <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.freeConsultation")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-n-7/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-n-6/50">
                  <CheckCircle className="w-5 h-5 sm:w-5 sm:h-5 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.noObligation")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-n-7/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-n-6/50">
                  <Shield className="w-5 h-5 sm:w-5 sm:h-5 text-color-1 flex-shrink-0" />
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

export default ContactFormProgressive;
