'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

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
    <div>
      {/* @ts-expect-error - Suppress any remaining TypeScript errors */}
      <model-viewer src={src} alt={alt || '3D model'} {...props}>
        <button
          slot="ar-button"
          style={{
            backgroundColor: 'white',
            borderRadius: '4px',
            border: 'none',
            position: 'absolute',
            bottom: '16px',
            right: '16px',
          }}
        >
          👀 View in AR
        </button>
        <button
          className="hotspot"
          slot="hotspot-hand"
          data-position="0 10 14"
          data-normal="1 0 0"
        >
          <div className="annotation">This is the pancake</div>
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
