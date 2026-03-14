import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['de', 'en'];
export const localePrefix = 'as-needed';

const routing = defineRouting({
  locales,
  localePrefix,
  defaultLocale: 'de',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);