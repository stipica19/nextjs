import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  
  let locale = await requestLocale;
 
  // ako nema jezika u URL-u koristi defaultni jezik
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  // - locale aktivni jezik koji ce se koristiti
  // - messages sadrzi sve poruke za prevod
  // - routing.locales sadrzi sve jezike koji su dostupni
  return {
    locale,
    messages: (await import(`@/locales/${locale}.json`)).default
  };
});