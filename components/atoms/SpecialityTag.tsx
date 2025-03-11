import React, { ReactNode } from 'react';
import { HugeiconsChefHat } from '../Icons';

export default function SpecialityTag({
  tag,
  icon,
  variant,
}: {
  tag: string;
  icon: ReactNode;
  variant?: 'dark' | 'light';
}) {
  return (
    <div
      className={`${variant === 'dark' ? 'border-[rgba(0,0,0,0.12)] text-black' : 'border-[rgb(146,118,111)] bg-[rgba(0,0,0,0.24)] text-white'} flex gap-[5px] rounded-[16px] border-[2px] p-[5px] backdrop-blur-md`}
    >
      {icon}
      <p className="text-small">{tag}</p>
    </div>
  );
}
