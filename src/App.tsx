import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Planet from "./components/Planet";
import { nodes } from "./data/nodes";
import './App.css';

function IntroAnimation() {
  const { camera} = useThree();

  useEffect(() => {
    gsap.from(camera.position, {
      x: 0,
      y: 0,
      z: 20,
      duration: 2,
      ease: "power3.out",
    });
  }, [camera]);

  return null;
}

function CameraTour({
  tourMode,
  tourIndex,
  setTourIndex,
  setSelected,
}: {
  tourMode: boolean;
  tourIndex: number;
  setTourIndex: (v: number) => void;
  setSelected: (v: string | null) => void;
}) {
  const { camera } =useThree();

  useEffect(() => {
    if (!tourMode) return;

    const node = nodes[tourIndex];
    if(!node) return;

    gsap.killTweensOf(camera.position);

    gsap.to(camera.position, {
      x: node.position[0] + 2,
      y: node.position[1] +1,
      z: node.position[2] +3,
      duration: 2,
      ease: "power2.inOut",
      onStart: () => {
        setSelected(node.id);
      },
      onComplete: () => {
        setTimeout(() => {
          setTourIndex((tourIndex + 1) % nodes.length);
        }, 3000);
      },
    });
  }, [tourIndex, tourMode, camera, setTourIndex, setSelected]);

  return null;
}

function CameraController({
  target,
  enabled,
}: {
  target: string | null;
  enabled: boolean;
}) {
  const { camera} = useThree();

  useEffect(() => {
    if(!enabled) return;
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
  }, [target, enabled, camera]);

  return null;
}

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourMode, setTourMode] = useState(true);

  const content: Record<string, string> = {
    projects:
      "Interactive full-stack and creative frontend projects built with React, TypeScript and Three.js.",

    skills:
      "Frotend development, Three.js, React, TypeScript, UI/UX and creative coding.",

    activity:
      "Building immersive web experiences and exploring cinematic frontend systems.",
  };

  return (
    <div className="app">

      {/* UI */}
      {selected && (
        <div className="panel">
          <h2>{selected}</h2>
          <p>{selected ? content[selected] : ""}</p>
        </div>
      )}

      <button
        onClick={() => setTourMode(!tourMode)}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "rgba(255,255,255,0.1)",
          color: "white",
          cursor: "pointer",
        }}
      >
        {tourMode ? "Stop Tour" : " Start Tour"}
      </button>

      <Canvas camera={{ position: [0, 0, 10], fov: 60}}>

        <ambientLight intensity={0.25} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={1.2}
        />

        <Stars radius={150} depth={80} count={10000} factor={3} saturation={0} fade/>

        <IntroAnimation />

        <CameraTour
          tourMode={tourMode}
          tourIndex={tourIndex}
          setTourIndex={setTourIndex}
          setSelected={setSelected}
        />
        
        <CameraController target={selected} enabled={!tourMode}/>

        {nodes.map((node) => (
          <Planet
            key={node.id}
            id={node.id}
            position={node.position as [number, number, number]}
            color={node.color}
            size={node.size}
            onSelect={(id) => {
              setSelected(id);
              setTourMode(false);
            }}
          />
        ))}

        <OrbitControls 
          enableDamping 
          enablePan={false}
        />

        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.45}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

      </Canvas>
    </div>
  );
}
