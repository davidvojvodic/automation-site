export const locales = ['en', 'sl'] as const; // 'hr' temporarily disabled
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

// Map countries to locales
export const countryToLocale: Record<string, Locale> = {
  'SI': 'sl', // Slovenia
  // 'HR': 'hr', // Croatia - temporarily disabled
  // Add more mappings as needed
};