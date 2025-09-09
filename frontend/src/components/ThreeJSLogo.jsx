import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

function RotatingLogo({ modelPath }) {
  const meshRef = useRef();
  const { scene, error } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => (mat.needsUpdate = true));
          } else {
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  if (error) {
    return (
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#ff6b35"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    );
  }

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[0.6, 0.6, 0.6]}
      position={[0, 0, 0]}
      rotation={[0, (4 * Math.PI) / 3, 0]} // start at specific angle
    />
  );
}

const ThreeJSLogo = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.8} />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

        <Environment preset="sunset" />

        {[...Array(8)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}

        <RotatingLogo modelPath="/model_draco.glb" />

        <OrbitControls
          enableZoom={false}
          enablePan={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

// ⬆️ moved FloatingParticle outside (so hooks aren’t inside a loop)
function FloatingParticle({ index }) {
  const particleRef = useRef();
  const initialPosition = [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  ];

  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.position.y =
        initialPosition[1] + Math.sin(state.clock.elapsedTime + index) * 0.5;
      particleRef.current.rotation.x += 0.01;
      particleRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={particleRef} position={initialPosition}>
      <sphereGeometry args={[0.01, 6, 6]} />
      <meshBasicMaterial color="#ff6b35" transparent opacity={0.2} />
    </mesh>
  );
}

export default ThreeJSLogo;
