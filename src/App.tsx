import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState } from "react";

import './App.css';
import Planet from "./components/Planet";
import { nodes } from "./data/nodes";


export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="app">

      {selected && (
        <div className="panel">
          <h2>{selected}</h2>
          <p>Click interaction working</p>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 6], fov: 60}}>

        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade/>

        {nodes.map((node) => (
          <Planet
            key={node.id}
            id={node.id}
            position={node.position as [number, number, number]}
            color={node.color}
            size={node.size}
            onSelect={setSelected}
          />
        ))}

        <OrbitControls enableDamping />

      </Canvas>
    </div>
  );
}
