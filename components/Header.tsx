'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CartIcon from './CartIcon';

const Header: React.FC = () => {
  const { lang, vendorId } = useParams();
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full max-w-[450px] items-center justify-between border-b bg-white px-4 shadow-sm">
      <Link href={`/${lang}/${vendorId}`} className="text-xl font-bold">
        AR Menu
      </Link>
      <div className="flex items-center gap-4">
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
