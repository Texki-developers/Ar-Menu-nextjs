import React from 'react';

export default function Tag({
  text,
  color = 'rgba(243,244,246,1)',
}: {
  text: string;
  color?: string;
}) {
  return (
    <p
      className={`text-description rounded-full p-[5px] px-[7px] capitalize`}
      style={{ background: color }}
    >
      {text}
    </p>
  );
}
