'use client';

import React, { createContext } from 'react';

export const translationProvider = createContext(null);
const TranslationWrapper = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: any;
}) => {
    return (
        <translationProvider.Provider value={value}>
            {children}
        </translationProvider.Provider>
    );
};

export default TranslationWrapper;
