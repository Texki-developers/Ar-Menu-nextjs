'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { MageBox3dDownload } from './Icons';

interface ModelViewerProps {
  src: string;
  alt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function ModelViewerComponent({ src, alt, ...props }: ModelViewerProps) {
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <div className="!max-w-[300px]">
      {/* @ts-expect-error - Suppress any remaining TypeScript errors */}
      <model-viewer
        style={{
          width: '160px',
          backgroundColor: '#dddddd6f',
          borderRadius: '10px',
          height: '160px',
        }}
        src={src}
        alt={alt || '3D model'}
        {...props}
      >
        <button
          slot="ar-button"
          className="btn-primary text-description absolute right-1 bottom-1 z-100 flex gap-[0.5rem] rounded-full font-[600] text-white"
        >
          <MageBox3dDownload className="text-[1rem]" />
          <span>View in Table</span>
        </button>
        {/* @ts-expect-error - Suppress any remaining TypeScript errors */}
      </model-viewer>
    </div>
  );
}

const ModelViewer = dynamic(() => Promise.resolve(ModelViewerComponent), {
  ssr: false,
});

export default ModelViewer;
