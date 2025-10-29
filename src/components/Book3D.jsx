import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

function BookModel() {
  const { scene } = useGLTF("/src/assets/open_book.glb");

  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, 0, 0]}
      rotation={[-0.3, 0, 0]}
    />
  );
}

export function Book3D() {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      <BookModel />
      <Environment preset="sunset" />
    </Canvas>
  );
}

useGLTF.preload("/src/assets/open_book.glb");
