import { Canvas } from '@react-three/fiber';

export default function Test3D() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas>
        <mesh rotation={[0.4, 0.2, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}
