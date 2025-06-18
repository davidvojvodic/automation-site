export const locales = ['en', 'sl', 'hr'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

// Map countries to locales
export const countryToLocale: Record<string, Locale> = {
  'SI': 'sl', // Slovenia
  'HR': 'hr', // Croatia
  // Add more mappings as needed
};