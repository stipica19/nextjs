"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { NextIntlClientProvider } from "next-intl"; //i18n

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Europe/Berlin"
      >
        {children}
      </NextIntlClientProvider>
    </Provider>
  );
}
