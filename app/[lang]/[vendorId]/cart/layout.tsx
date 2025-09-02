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
  return <div className="h-full min-h-screen bg-gray-100">{children}</div>;
}
