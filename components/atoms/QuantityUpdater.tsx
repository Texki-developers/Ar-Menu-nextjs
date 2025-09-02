'use client';

import { PlusIcon, MinusIcon } from 'lucide-react';
import React from 'react';

interface QuantityUpdaterProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onQuantityChange?: (quantity: number) => void;
    min?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'compact' | 'inline';
    className?: string;
}

const QuantityUpdater: React.FC<QuantityUpdaterProps> = ({
    quantity,
    onIncrement,
    onDecrement,
    variant = 'default',
    className = '',
}) => {

    if (variant === 'compact') {
        return (
            <div className={`flex w-fit items-center gap-2 rounded-lg ${className}`}>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onIncrement();
                    }}
                    className="flex h-[35px] w-[35px] items-center justify-center rounded-2xl bg-black"
                >
                    <PlusIcon className="text-white h-4 w-4 font-bold" />
                </button>
                <span className="text-md min-w-[20px] text-center font-semibold text-gray-900">
                    {quantity}
                </span>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDecrement();
                    }}
                    className="flex h-[35px] w-[35px] items-center justify-center rounded-2xl bg-black"
                >
                    <MinusIcon className="text-white h-4 w-4 font-bold" />
                </button>
            </div>
        );
    }
};

export default QuantityUpdater;
