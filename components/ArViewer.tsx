'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ARViewer() {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || rendererRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;

    // Add to DOM
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
      containerRef.current.appendChild(ARButton.createButton(renderer));
    } else {
      document.body.appendChild(renderer.domElement);
      document.body.appendChild(ARButton.createButton(renderer));
    }

    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);

    // Load GLB model
    const loader = new GLTFLoader();

    // Update path to your GLB file
    loader.load(
      '/assets/modal/lays.glb', // Make sure this path matches your file location
      (gltf) => {
        const model = gltf.scene;

        // Adjust scale and position as needed
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, -0.5);

        // Add model to scene
        scene.add(model);

        // Optional: Center model and adjust to appropriate size
        const box = new THREE.Box3().setFromObject(model);
        // const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center the model if needed
        // model.position.sub(center); // Uncomment if you want to center the model

        // Log model dimensions for debugging
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
        }
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (rendererRef.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);

      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      } else if (renderer.domElement.parentNode === document.body) {
        document.body.removeChild(renderer.domElement);
      }

      rendererRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}
