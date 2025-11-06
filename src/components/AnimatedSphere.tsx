import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      const t = clock.getElapsedTime();
      sphereRef.current.rotation.x = t * 0.3;
      sphereRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}
