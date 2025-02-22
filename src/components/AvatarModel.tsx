import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const AvatarModel = forwardRef((props, ref) => {
  // Temporarily using a basic geometry as placeholder
  // In production, replace with actual medical avatar model
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#4a90e2" />
    </mesh>
  );
});

AvatarModel.displayName = 'AvatarModel';
