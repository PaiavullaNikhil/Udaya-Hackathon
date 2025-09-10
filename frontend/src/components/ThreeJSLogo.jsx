import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

function RotatingLogo({ modelPath }) {
  const meshRef = useRef();
  const { scene, error } = useGLTF(modelPath);

  const [responsiveScale, setResponsiveScale] = useState([0.8, 0.8, 0.8]);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) setResponsiveScale([0.65, 0.65, 0.65]);
      else if (screenWidth < 1110) setResponsiveScale([0.65, 0.65, 0.65]);
      else if (screenWidth < 1280) setResponsiveScale([0.7, 0.7, 0.7]);
      else if (screenWidth < 1536) setResponsiveScale([0.8, 0.8, 0.8]);
      else setResponsiveScale([0.9, 0.9, 0.9]);
    };

    // Run on mount
    updateScale();

    // Listen to resize
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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
      scale={responsiveScale}
      position={[0, 0, 0]}
      rotation={[0, (4 * Math.PI) / 3, 0]} // start at specific angle
    />
  );
}

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

const ThreeJSLogo = () => {
  return (
    <div className="relative w-full h-[60vh] max-h-[700px] overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 100 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
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

export default ThreeJSLogo;
