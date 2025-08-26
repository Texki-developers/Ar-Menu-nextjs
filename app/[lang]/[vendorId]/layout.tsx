import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import '../../globals.css';
import { getDictionary, ILocale } from '@/lib/dictionaries/config';
import TranslationWrapper from '@/providers/translation-provider/TranslationProvider';
import Header from '@/components/Header';

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
});

const ManRopeFont = Manrope({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Coz Coffee',
  description: 'Coz Coffee',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: ILocale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${PlusJakartaSans.className} ${ManRopeFont.className} flex w-[100%] justify-center antialiased`}
      >
        <div className="min-h-[100vh] w-[100%] max-w-[450px] bg-white">
          <Header />
          <main className="pb-16">
            <TranslationWrapper value={dict}>{children}</TranslationWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
