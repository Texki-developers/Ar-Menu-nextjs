import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import { getDictionary, ILocale } from '@/lib/dictionaries/config';
import TranslationWrapper from '@/providers/translation-provider/TranslationProvider';
import Header from '@/components/Header';
import './globals.css';

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
});

const ManRopeFont = Manrope({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: ILocale }>;
}>) {
  const { lang } = await params;
  console.log(await params);
  const dict = await getDictionary('en');

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${PlusJakartaSans.className} ${ManRopeFont.className} flex w-[100%] justify-center antialiased`}
      >
        <div className="min-h-[100vh] w-[100%] max-w-[450px] bg-white">
          <Header />
          <main className="">
            <TranslationWrapper value={dict}>{children}</TranslationWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
