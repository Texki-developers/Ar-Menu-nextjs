import { ILocale } from '@/lib/dictionaries/config';
import Image from 'next/image';
import React from 'react';

const HomeBanner = () => {
    return (
        <div>
            <div className="relative flex h-28 w-full items-center justify-start px-4">
                <Image
                    src="/assets/coffee-banner.webp"
                    alt="Coffee shop"
                    fill
                    className="object-cover"
                />
                <div className="relative z-10 aspect-square h-full translate-y-1/5 overflow-hidden rounded-lg border-4 border-gray-400">
                    <Image
                        src="/assets/coffee-shop-logo.jpg"
                        fill
                        alt="restaurant logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
