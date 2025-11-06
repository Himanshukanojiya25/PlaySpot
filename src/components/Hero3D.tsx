import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-transparent">
      <Suspense fallback={<p className="text-gray-400 text-center mt-4">Loading 3D scene...</p>}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} />
          <mesh rotation={[0.4, 0.3, 0]}>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3D;
