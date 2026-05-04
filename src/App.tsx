import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import './App.css';

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4f8cff" />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 5], fov: 60}}>

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Stars radius={100} depth={50} count={5000} factor={4} />

        <Sphere />

        <OrbitControls enableDamping />

      </Canvas>
    </div>
  );
}
