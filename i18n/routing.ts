import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'sl', 'hr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Hide default locale (en) from URL
});
 
export const {Link, redirect, usePathname, useRouter} = 
  createNavigation(routing);