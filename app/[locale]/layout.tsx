import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const locales = ["en", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={locale === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}