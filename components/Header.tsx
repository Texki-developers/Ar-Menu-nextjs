'use client';

import React from 'react';
import CartIcon from './CartIcon';

const Header: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-[999] rounded-full border border-gray-200 bg-white p-2 shadow-md">
      <CartIcon />
    </div>
  );
};

export default Header;
