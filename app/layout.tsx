import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import './globals.css';

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
});

const ManRopeFont = Manrope({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PlusJakartaSans.className} ${ManRopeFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
