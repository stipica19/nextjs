import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const locales = ["en", "de"];

export default getRequestConfig(async () => {
    const locale = (await headers()).get("X-NEXT-INTL-LOCALE"); // 📌 Obezbeđujemo da je headers awaited

    if (!locale || !locales.includes(locale)) {
        notFound(); // ✅ Ako je jezik nepoznat, vraća 404
    }

    return {
        messages: (await import(`./locales/${locale}.json`)).default,
    };
});
