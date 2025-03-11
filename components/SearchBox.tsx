'use-client';
import React from 'react';
import { MaterialSymbolsSearchRounded } from './Icons';

export default function index() {
  return (
    <div className="flex gap-[0.5rem] rounded-[12px] border-[1.5px] border-[rgb(177,177,177)] p-[6px]">
      <MaterialSymbolsSearchRounded
        fontSize="1.5rem"
        color="rgb(177,177,177)"
      />
      <input
        type="text"
        placeholder="Search For Biriyani"
        className="text-description flex-1 outline-none"
      />
    </div>
  );
}
