'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { MageBox3dDownload } from './Icons';
import SmallLoading from './atoms/loading/small/smallLoading';

interface ModelViewerProps {
  src: string;
  alt?: string;
  label?: string;
  type?: 'category' | 'search' | 'recommended';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function ModelViewerComponent({
  src,
  alt,
  label,
  type,
  ...props
}: ModelViewerProps) {
  useEffect(() => {
    import('@google/model-viewer');
    const modelViewer = document.getElementById(
      `model-viewer-${label}-${type}`
    );
    if (modelViewer) {
      modelViewer.addEventListener('load', () => {
        document
          .getElementById(`loading-indicator-${label}-${type}`)
          ?.classList.add('hidden');
      });
    }
  }, []);

  return (
    <div className="relative !max-w-[300px]">
      {/* @ts-expect-error - Suppress any remaining TypeScript errors */}
      <model-viewer
        id={`model-viewer-${label}-${type}`}
        style={{
          width: '160px',
          backgroundColor: '#dddddd6f',
          borderRadius: '10px',
          height: '160px',
        }}
        src={src}
        modelCacheSize={15}
        powerPreference="low-power"
        ar-modes="scene-viewer quick-look"
        alt={alt || '3D model'}
        {...props}
      >
        <button
          slot="ar-button"
          className="btn-primary text-description absolute right-1 bottom-1 z-100 flex gap-[0.5rem] rounded-full font-[600] text-white"
        >
          <MageBox3dDownload className="text-[1rem]" />
          <span> View in Table</span>
        </button>
        {/* @ts-expect-error - Suppress any remaining TypeScript errors */}
      </model-viewer>
      <div
        id={`loading-indicator-${label}-${type}`}
        className="absolute top-0 left-0 z-100 h-full w-full"
      >
        <SmallLoading />
      </div>
    </div>
  );
}

const ModelViewer = dynamic(() => Promise.resolve(ModelViewerComponent), {
  ssr: false,
});

export default ModelViewer;
