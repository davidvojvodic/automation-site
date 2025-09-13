import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'sl'], // 'hr' temporarily disabled
  defaultLocale: 'en',
  localePrefix: 'as-needed', // Hide default locale (en) from URL
  // Ensure English is always the default without auto-detection
  localeDetection: false
});
 
export const {Link, redirect, usePathname, useRouter} = 
  createNavigation(routing);