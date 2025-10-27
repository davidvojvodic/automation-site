"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import {
  MessageCircle,
  Shield,
  CheckCircle,
  ChevronLeft,
  Clock,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { CheckmarkAnimation } from "./CheckmarkAnimation";
import Cal from "@calcom/embed-react";

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

export function ContactFormProgressive({
  className,
}: ContactFormProgressiveProps) {
  const t = useTranslations("HomePage.contact");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "booking">("form");
  const [selectedDuration, setSelectedDuration] = useState<"30" | "45">("30");
  const [containerHeight, setContainerHeight] = useState<number | "auto">(
    "auto"
  );

  // Refs for measuring content heights
  const formRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const bookingContentRef = useRef<HTMLDivElement>(null);

  const {
    currentStep,

    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm({ totalSteps: 4 });

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

  // Sync booking duration with bundleInterest when switching to booking view
  useEffect(() => {
    if (activeTab === "booking") {
      const bundleInterest = form.getValues("bundleInterest");
      setSelectedDuration(bundleInterest ? "45" : "30");
    }
  }, [activeTab, form]);

  // Measure and update container height based on active view
  useLayoutEffect(() => {
    const measureHeight = () => {
      if (activeTab === "form" && formContentRef.current && formRef.current) {
        // Measure the inner content div
        const contentHeight = formContentRef.current.scrollHeight;

        // Get padding from the wrapper to account for p-2 sm:p-6 md:p-8
        const wrapper = formRef.current;
        const computedStyle = window.getComputedStyle(wrapper);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);

        // Add padding to content height
        setContainerHeight(contentHeight + paddingTop + paddingBottom);
      } else if (
        activeTab === "booking" &&
        bookingContentRef.current &&
        bookingRef.current
      ) {
        // Measure the inner content div
        const contentHeight = bookingContentRef.current.scrollHeight;

        // Get padding from the wrapper
        const wrapper = bookingRef.current;
        const computedStyle = window.getComputedStyle(wrapper);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);

        // Add padding to content height, ensure minimum height for Cal widget
        setContainerHeight(
          Math.max(contentHeight + paddingTop + paddingBottom, 950)
        );
      }
    };

    // Measure immediately
    measureHeight();

    // Also measure after a short delay to account for dynamic content
    const timeoutId = setTimeout(measureHeight, 100);

    return () => clearTimeout(timeoutId);
  }, [activeTab, currentStep]);

  // Calculate display progress for 3-step form (success screen is step 4, not counted)
  const displayProgress = Math.min((currentStep / 3) * 100, 100);

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
        description:
          locale === "sl"
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

        // Transition to Step 4 success screen
        nextStep();

        // Reset form after showing success screen
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
      case 4:
        return locale === "sl"
          ? "Hvala za vašo prijavo!"
          : "Thank You for Reaching Out!";
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return locale === "sl" ? "Povejte nam, kdo ste" : "Tell us who you are";
      case 2:
        return locale === "sl" ? "Kje delate?" : "Where do you work?";
      case 3:
        return locale === "sl" ? "Kaj potrebujete?" : "What do you need?";
      case 4:
        return locale === "sl"
          ? "Vaša zahteva je bila uspešno poslana"
          : "Your request has been successfully submitted";
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("title")}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-n-4">
              {t("subtitle")}
            </p>
          </div>

          {/* Quick Booking Callout - Only shown on form view */}
          {activeTab === "form" && (
            <div className="bg-color-1/10 border border-color-1/30 rounded-xl p-4 sm:p-5 mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-color-1 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-n-1 font-medium">
                    {t("quickBooking.title")}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("booking")}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 bg-color-1 hover:bg-color-1/90 text-white rounded-lg transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
                >
                  {t("quickBooking.button")}
                </button>
              </div>
            </div>
          )}

          {/* Views Container with smooth transitions - absolute positioning with dynamic height */}
          <div
            className="relative overflow-hidden transition-[height] duration-[600ms] ease-in-out"
            style={{
              height:
                containerHeight === "auto" ? "auto" : `${containerHeight}px`,
            }}
          >
            {/* Form View */}
            <div
              ref={formRef}
              className={cn(
                "absolute inset-0 transition-opacity duration-[400ms] ease-out",
                activeTab === "form"
                  ? "opacity-100 z-10 delay-300"
                  : "opacity-0 pointer-events-none z-0 delay-0",
                "bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl p-2 sm:p-6 md:p-8 overflow-hidden"
              )}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-color-1/5 to-transparent pointer-events-none" />

              <div ref={formContentRef} className="relative z-10">
                {/* Progress Bar - Only show for steps 1-3 */}
                {currentStep <= 3 && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-n-3">
                        {locale === "sl" ? "Korak" : "Step"} {currentStep}{" "}
                        {locale === "sl" ? "od" : "of"} 3
                      </span>
                    </div>
                    <div className="w-full bg-n-6 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-color-1 to-color-2 transition-all duration-500 ease-out"
                        style={{ width: `${displayProgress}%` }}
                      />
                    </div>
                  </div>
                )}

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
                                {t("form.website")}{" "}
                                {locale === "sl" ? "(neobvezno)" : "(optional)"}
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

                    {/* Step 4: Success Screen with Cal.com Booking */}
                    {currentStep === 4 && (
                      <div className="space-y-8 animate-fade-in">
                        {/* Success Animation and Message */}
                        <div className="text-center">
                          <CheckmarkAnimation />

                          <h3 className="text-2xl font-bold text-n-1 mb-3">
                            {locale === "sl"
                              ? "Uspešno poslano!"
                              : "Successfully Submitted!"}
                          </h3>

                          <p className="text-n-3 max-w-2xl mx-auto">
                            {locale === "sl"
                              ? "Prejeli smo vašo zahtevo in jo bomo natančno pregledali. Naša ekipa vas bo kmalu kontaktirala z brezplačno analizo in priporočili za avtomatizacijo."
                              : "We've received your request and will review it carefully. Our team will contact you soon with your free analysis and automation recommendations."}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons - Hidden on Step 4 */}
                    {currentStep !== 4 && (
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
                          {currentStep < 3 ? (
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
                                  {locale === "sl"
                                    ? "Pošiljanje..."
                                    : "Sending..."}
                                </span>
                              ) : (
                                t("form.submitButton")
                              )}
                            </CustomButton>
                          )}
                        </div>
                      </div>
                    )}

                    {isLastStep && currentStep !== 4 && (
                      <p className="text-xs sm:text-sm text-n-5 text-center pt-4">
                        {t("form.privacyNote")}
                      </p>
                    )}
                  </form>
                </Form>

                {/* Trust Indicators - Only show on form steps 1-3 */}
                {currentStep <= 3 && (
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
                )}
              </div>
            </div>

            {/* Booking View */}
            <div
              ref={bookingRef}
              className={cn(
                "absolute inset-0 transition-opacity duration-[400ms] ease-out",
                activeTab === "booking"
                  ? "opacity-100 z-10 delay-300"
                  : "opacity-0 pointer-events-none z-0 delay-0",
                "bg-n-8 border border-n-6 rounded-2xl sm:rounded-3xl p-2 sm:p-6 md:p-8 overflow-hidden"
              )}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-color-1/5 to-transparent pointer-events-none" />

              <div ref={bookingContentRef} className="relative z-10 space-y-8">
                {/* Back to Form Button */}
                <button
                  onClick={() => setActiveTab("form")}
                  className="flex items-center gap-2 text-n-3 hover:text-color-1 transition-colors text-sm sm:text-base font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("quickBooking.backToForm")}
                </button>
                {/* Duration Selection */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setSelectedDuration("30")}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300",
                      "border-2 font-medium",
                      selectedDuration === "30"
                        ? "bg-color-1 border-color-1 text-white"
                        : "bg-n-7 border-n-6 text-n-3 hover:border-color-1/50"
                    )}
                  >
                    <Clock className="w-5 h-5" />
                    <span>{t("booking.duration30.title")}</span>
                  </button>
                  <button
                    onClick={() => setSelectedDuration("45")}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300",
                      "border-2 font-medium",
                      selectedDuration === "45"
                        ? "bg-color-1 border-color-1 text-white"
                        : "bg-n-7 border-n-6 text-n-3 hover:border-color-1/50"
                    )}
                  >
                    <Clock className="w-5 h-5" />
                    <span>{t("booking.duration45.title")}</span>
                  </button>
                </div>

                {/* Description */}
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-n-3 text-sm sm:text-base">
                    {selectedDuration === "30"
                      ? t("booking.duration30.description")
                      : t("booking.duration45.description")}
                  </p>
                </div>

                {/* Cal.com Widget - key prop forces re-mount when duration changes */}
                <div>
                  <Cal
                    key={selectedDuration}
                    calLink={
                      selectedDuration === "30"
                        ? "flowko/automation-audit-30min"
                        : "flowko/digital-strategy-45min"
                    }
                    config={{
                      theme: "dark",
                      layout: "month_view",
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "630px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End Views Container */}
        </div>
      </div>
    </Section>
  );
}

export default ContactFormProgressive;
