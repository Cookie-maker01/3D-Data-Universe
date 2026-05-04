import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import './App.css';

import Planet from "./components/Planet";
import { nodes } from "./data/nodes";


export default function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 6], fov: 60}}>

        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade/>

        {nodes.map((node) => (
          <Planet
            key={node.id}
            position={node.position as [number, number, number]}
            color={node.color}
            size={node.size}
          />
        ))}

        <OrbitControls enableDamping />

      </Canvas>
    </div>
  );
}
