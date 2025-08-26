'use client';

import { CartProvider } from '@/providers/CartProvider';
import FoodChatbot from '@/components/chat/FoodChatbot';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <FoodChatbot />
        </CartProvider>
      </body>
    </html>
  );
}
