import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Planet from "./components/Planet";
import { nodes } from "./data/nodes";
import './App.css';

function CameraController({ target} : { target: string | null }) {
  const { camera} = useThree();

  useEffect(() => {
    if(!target) return;

    const node = nodes.find((n) => n.id === target);
    if(!node) return;
  
    gsap.killTweensOf(camera.position);

    gsap.to(camera.position, {
      x: node.position[0] + 2,
      y: node.position[1] +1,
      z: node.position[2] +3,
      duration: 1.2,
      ease: "power2.out",
    });
  }, [target, camera]);

  return null;
}

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="app">

      {selected && (
        <div className="panel">
          <h2>{selected}</h2>
          <p>Focused view activated</p>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 6], fov: 60}}>

        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Stars radius={120} depth={60} count={8000} factor={4} fade/>
        
        <CameraController target={selected} />

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

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

      </Canvas>
    </div>
  );
}
