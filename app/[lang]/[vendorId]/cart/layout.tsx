import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your order and proceed to checkout',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-16">
        {children}
      </main>
    </div>
  );
}
