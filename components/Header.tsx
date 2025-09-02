'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CartIcon from './CartIcon';

const Header: React.FC = () => {
  const { lang, vendorId } = useParams();
  return (

    <div className="fixed top-4 right-4 z-[999] bg-white rounded-full p-2 shadow-md border border-gray-200">
      <CartIcon />
    </div>
  );
};

export default Header;
