import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AvatarModel } from './AvatarModel';

export function Avatar() {
  const avatarRef = useRef();

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gray-900">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        shadows
    >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <AvatarModel ref={avatarRef} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
