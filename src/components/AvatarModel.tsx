import { forwardRef, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExamStore } from '../store/examStore';

export const AvatarModel = forwardRef((props, ref) => {
  const sphereRef = useRef();
  const rippleRef = useRef();
  const materialRef = useRef();
  const { selectedDoctor } = useExamStore();
  
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.userData.time = 0;
    }
  }, []);

  // Define colors based on selected doctor gender
  const getColors = () => {
    if (selectedDoctor === 'female') {
      return {
        primary: new THREE.Color('#FF69B4'), // Pink
        secondary: new THREE.Color('#FF1493'), // Deep Pink
        particle: new THREE.Color('#FFB6C1'), // Light Pink
      };
    }
    return {
      primary: new THREE.Color('#4a90e2'), // Blue
      secondary: new THREE.Color('#2563eb'), // Darker Blue
      particle: new THREE.Color('#93c5fd'), // Light Blue
    };
  };

  const colors = getColors();

  useFrame((state) => {
    if (sphereRef.current && rippleRef.current && materialRef.current) {
      // Gentle floating animation
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Ripple effect
      materialRef.current.userData.time += 0.01;
      const scale = 1 + Math.sin(materialRef.current.userData.time * 2) * 0.05;
      rippleRef.current.scale.set(scale, scale, scale);
      
      // Color pulse
      const hue = (Math.sin(state.clock.elapsedTime * 0.2) + 1) * 0.1;
      const lerpedColor = colors.primary.clone().lerp(colors.secondary, hue);
      materialRef.current.color = lerpedColor;
    }
  });

  return (
    <group ref={ref}>
      {/* Main sphere */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={colors.primary}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* Ripple effect */}
      <mesh ref={rippleRef} position={[0, 0, 0]}>
        <ringGeometry args={[0.6, 0.7, 32]} />
        <meshBasicMaterial
          color={colors.secondary}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * Math.PI * 2 / 20) * 0.8,
            Math.cos(i * Math.PI * 2 / 20) * 0.8,
            0
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={colors.particle} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
});

AvatarModel.displayName = 'AvatarModel';
