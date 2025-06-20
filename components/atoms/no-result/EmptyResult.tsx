import React from 'react';
import Image from 'next/image';

const NoResult = ({
  title,
  description,
  image,
}: {
  title?: string;
  description: string;
  image?: string;
}) => {
  return (
    <div className="m-3 grid items-center justify-items-center gap-3 rounded-lg border border-[#d677405c] py-3">
      <div className="grid justify-items-center">
        {title && <h1 className="text-lg font-bold">{title}</h1>}
        {description && (
          <p className="text-description text-[#414141]">{description}</p>
        )}
      </div>
      <Image
        src={image || '/assets/images/NoResultSvg.svg'}
        alt="empty result"
        width={150}
        height={150}
      />
    </div>
  );
};

export default NoResult;
