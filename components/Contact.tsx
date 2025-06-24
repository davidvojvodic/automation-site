"use client";

import React from "react";
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
import { useTranslations } from "next-intl";
import { MessageCircle, Shield, CheckCircle } from "lucide-react";

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
    try {
      // Webhook submission will go here
      console.log("Form submission:", values);

      // For now, just log and show success
      alert(t("messages.success"));
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert(t("messages.error"));
    }
  }

  return (
    <Section crosses className={cn(className)} id="contact">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-contact-header">
            <h2 className="h2 mb-4">{t("title")}</h2>
            <p className="body-1 text-n-4">{t("subtitle")}</p>
          </div>

          {/* Form */}
          <div
            className="relative bg-n-8 border border-n-6 rounded-3xl p-8 md:p-12 overflow-hidden animate-contact-form"
            style={{ animationDelay: "200ms" }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-color-1/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Basic Contact Info */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-contact-fields"
                    style={{ animationDelay: "400ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-n-1">
                            {t("form.firstName")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.firstNamePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
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
                          <FormLabel className="text-n-1">
                            {t("form.lastName")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.lastNamePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-contact-fields"
                    style={{ animationDelay: "600ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-n-1">
                            {t("form.email")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("form.emailPlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
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
                          <FormLabel className="text-n-1">
                            {t("form.company")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.companyPlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-contact-fields"
                    style={{ animationDelay: "800ms" }}
                  >
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-n-1">
                            {t("form.industry")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("form.industryPlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
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
                          <FormLabel className="text-n-1">
                            {t("form.website")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder={t("form.websitePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4"
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
                            <p className="text-sm text-n-4">
                              {t("form.bundleInterestDescription")}
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
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
                          <FormLabel className="text-n-1">
                            {t("form.message")} {t("form.required")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("form.messagePlaceholder")}
                              {...field}
                              className="bg-n-7 border-n-6 text-n-1 placeholder:text-n-4 min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-8 animate-contact-submit" style={{ animationDelay: "1400ms" }}>
                    <div className="flex flex-col items-center gap-4">
                      <CustomButton
                        onClick={(e) => {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }}
                        className="w-full sm:w-auto min-w-[280px] hover:scale-105 transition-transform duration-200"
                      >
                        {t("form.submitButton")}
                      </CustomButton>
                      <p className="text-xs text-n-5 max-w-md">
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
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-n-4 text-sm">
                <div className="flex items-center gap-2 bg-n-7/50 px-4 py-2 rounded-full border border-n-6/50">
                  <MessageCircle className="w-4 h-4 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.freeConsultation")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-n-7/50 px-4 py-2 rounded-full border border-n-6/50">
                  <CheckCircle className="w-4 h-4 text-color-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {t("trustIndicators.noObligation")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-n-7/50 px-4 py-2 rounded-full border border-n-6/50">
                  <Shield className="w-4 h-4 text-color-1 flex-shrink-0" />
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
