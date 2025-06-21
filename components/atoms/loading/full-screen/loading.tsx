'use client';

import animationData from './animationData.json';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <>
      <div className="fixed z-[9999] flex h-screen w-full max-w-[450px] items-center justify-center bg-white">
        <Lottie
          className="scale-25"
          animationData={animationData}
          loop={true}
        />
      </div>
    </>
  );
};

export default Loading;
