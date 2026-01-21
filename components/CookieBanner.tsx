"use client";

import React, { useState, useEffect } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";



interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

// Global variable to hold the function reference
let globalOpenCookieSettings: (() => void) | null = null;

const CookieBanner = () => {
  const t = useTranslations("HomePage.cookieBanner");
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  // Close banner without saving preferences (will show again on next visit)
  const closeBanner = () => {
    setShowBanner(false);
  };

  useEffect(() => {
    setMounted(true);

    // Expose function to open settings dialog
    globalOpenCookieSettings = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        try {
          const savedPreferences = JSON.parse(consent);
          setPreferences(savedPreferences);
        } catch (error) {
          console.error("Error parsing cookie preferences:", error);
        }
      }
      setShowDialog(true);
    };

    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        // Initialize tracking based on preferences
        initializeTracking(savedPreferences);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
        setShowBanner(true);
      }
    }
  }, []);

  const initializeTracking = (prefs: CookiePreferences) => {
    // Initialize Google Analytics if analytics cookies are accepted
    if (prefs.analytics) {
      console.log("Analytics consent granted. Mounting GoogleAnalytics component...");
      // Component will be mounted via JSX below
    }

    // Initialize marketing tracking if marketing cookies are accepted
    if (prefs.marketing && typeof window !== "undefined") {
      // Facebook Pixel, LinkedIn tracking, etc. would go here
      console.log("Marketing tracking initialized");
    }

    // Initialize functional cookies if accepted
    if (prefs.functional && typeof window !== "undefined") {
      // Theme preferences, form progress, etc.
      console.log("Functional cookies enabled");
    }
  };

  const savePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    initializeTracking(newPreferences);
    setShowBanner(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const acceptEssentialOnly = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(essentialOnly);
  };

  const handlePreferenceChange = (category: keyof CookiePreferences) => {
    if (category === "essential") return; // Essential cookies cannot be disabled

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowDialog(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Conditionally Render Google Analytics Component */}
      {preferences.analytics && (
        <GoogleAnalytics gaId="G-R4Z56K3J16" />
      )}

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-n-8 border-t border-n-6 p-6 shadow-lg">
          <div className="container mx-auto">
            {/* Main banner */}
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeBanner}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-n-7 hover:bg-n-6 text-n-4 hover:text-n-1 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pr-8">
                <div className="flex-1">
                  <h3 className="h6 mb-2">{t("title")}</h3>
                  <p className="body-2 text-n-4">
                    {t("description")}{" "}
                    <Link href="/cookies" className="text-color-1 hover:underline">
                      {t("cookiePolicy")}
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-n-6 text-black hover:bg-white/80"
                      >
                        {t("buttons.customize")}
                      </Button>
                    </DialogTrigger>
                <DialogContent className="bg-n-8 border-n-6 text-n-1 max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="h6">
                      {t("preferences.title")}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    {/* Essential Cookies */}
                    <div className="bg-n-7 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="h6 mb-2">
                            {t("preferences.essential.title")}
                          </h4>
                          <p className="body-2 text-n-4">
                            {t("preferences.essential.description")}
                          </p>
                          <p className="caption text-n-5 mt-2">
                            {t("preferences.essential.status")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch
                            id="essential"
                            checked={preferences.essential}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="bg-n-7 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="h6 mb-2">
                            {t("preferences.analytics.title")}
                          </h4>
                          <p className="body-2 text-n-4">
                            {t("preferences.analytics.description")}
                          </p>
                          <p className="caption text-n-5 mt-2">
                            {t("preferences.analytics.details")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch
                            id="analytics"
                            checked={preferences.analytics}
                            onCheckedChange={() =>
                              handlePreferenceChange("analytics")
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="bg-n-7 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="h6 mb-2">
                            {t("preferences.marketing.title")}
                          </h4>
                          <p className="body-2 text-n-4">
                            {t("preferences.marketing.description")}
                          </p>
                          <p className="caption text-n-5 mt-2">
                            {t("preferences.marketing.details")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch
                            id="marketing"
                            checked={preferences.marketing}
                            onCheckedChange={() =>
                              handlePreferenceChange("marketing")
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="bg-n-7 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="h6 mb-2">
                            {t("preferences.functional.title")}
                          </h4>
                          <p className="body-2 text-n-4">
                            {t("preferences.functional.description")}
                          </p>
                          <p className="caption text-n-5 mt-2">
                            {t("preferences.functional.details")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch
                            id="functional"
                            checked={preferences.functional}
                            onCheckedChange={() =>
                              handlePreferenceChange("functional")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        acceptEssentialOnly();
                        setShowDialog(false);
                      }}
                      className="border-n-6 text-black hover:bg-white/80"
                    >
                      {t("buttons.essentialOnly")}
                    </Button>
                    <Button
                      onClick={saveCustomPreferences}
                      className="bg-color-1 hover:bg-color-1/90 text-n-8"
                    >
                      {t("buttons.savePreferences")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                onClick={acceptEssentialOnly}
                className="border-n-6 text-black hover:bg-white/80"
              >
                {t("buttons.essentialOnly")}
              </Button>
              <Button
                onClick={acceptAll}
                className="bg-color-1 hover:bg-color-1/90 text-n-8"
              >
                {t("buttons.acceptAll")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}

      {/* Standalone Cookie Settings Dialog */}
      <Dialog open={showDialog && !showBanner} onOpenChange={setShowDialog}>
        <DialogContent className="bg-n-8 border-n-6 text-n-1 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="h6">
              {t("preferences.title")}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {/* Essential Cookies */}
            <div className="bg-n-7 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="h6 mb-2">
                    {t("preferences.essential.title")}
                  </h4>
                  <p className="body-2 text-n-4">
                    {t("preferences.essential.description")}
                  </p>
                  <p className="caption text-n-5 mt-2">
                    {t("preferences.essential.status")}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Switch
                    id="essential-standalone"
                    checked={preferences.essential}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-n-7 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="h6 mb-2">
                    {t("preferences.analytics.title")}
                  </h4>
                  <p className="body-2 text-n-4">
                    {t("preferences.analytics.description")}
                  </p>
                  <p className="caption text-n-5 mt-2">
                    {t("preferences.analytics.details")}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Switch
                    id="analytics-standalone"
                    checked={preferences.analytics}
                    onCheckedChange={() =>
                      handlePreferenceChange("analytics")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-n-7 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="h6 mb-2">
                    {t("preferences.marketing.title")}
                  </h4>
                  <p className="body-2 text-n-4">
                    {t("preferences.marketing.description")}
                  </p>
                  <p className="caption text-n-5 mt-2">
                    {t("preferences.marketing.details")}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Switch
                    id="marketing-standalone"
                    checked={preferences.marketing}
                    onCheckedChange={() =>
                      handlePreferenceChange("marketing")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="bg-n-7 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="h6 mb-2">
                    {t("preferences.functional.title")}
                  </h4>
                  <p className="body-2 text-n-4">
                    {t("preferences.functional.description")}
                  </p>
                  <p className="caption text-n-5 mt-2">
                    {t("preferences.functional.details")}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Switch
                    id="functional-standalone"
                    checked={preferences.functional}
                    onCheckedChange={() =>
                      handlePreferenceChange("functional")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                acceptEssentialOnly();
                setShowDialog(false);
              }}
              className="border-n-6 text-black hover:bg-white/80"
            >
              {t("buttons.essentialOnly")}
            </Button>
            <Button
              onClick={saveCustomPreferences}
              className="bg-color-1 hover:bg-color-1/90 text-n-8"
            >
              {t("buttons.savePreferences")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Export function to open cookie settings from other components
export const openCookieSettings = () => {
  if (globalOpenCookieSettings) {
    globalOpenCookieSettings();
  }
};

export default CookieBanner;
