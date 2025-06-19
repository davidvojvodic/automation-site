"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import Section from "./Section";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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
    message: z.string().min(10, t("validation.messageMin")),
  });

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website?: string;
  industry: string;
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
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{t("title")}</h2>
            <p className="body-1 text-n-4">{t("subtitle")}</p>
          </div>

          {/* Form */}
          <div className="bg-n-8 border border-n-6 rounded-3xl p-8 md:p-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Basic Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* Message */}
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

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-8"
                  >
                    {t("form.submitButton")}
                  </Button>
                  <p className="text-n-4 text-sm mt-3">
                    {t("form.responseTime")}
                  </p>
                </div>
              </form>
            </Form>
          </div>

          {/* Trust indicators */}
          <div className="text-center mt-8">
            <div className="flex flex-wrap justify-center gap-8 text-n-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-color-1 rounded-full"></div>
                <span>{t("trustIndicators.freeConsultation")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-color-1 rounded-full"></div>
                <span>{t("trustIndicators.noObligation")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-color-1 rounded-full"></div>
                <span>{t("trustIndicators.gdprCompliant")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
