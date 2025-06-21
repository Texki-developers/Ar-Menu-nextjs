'use client';

import animationData from './smallLoading.json';
import Lottie from 'lottie-react';

const SmallLoading = () => {
    return (
        <>
            <div className="h-full w-full items-center justify-center bg-white">
                <Lottie animationData={animationData} loop={true} />
            </div>
        </>
    );
};

export default SmallLoading;
