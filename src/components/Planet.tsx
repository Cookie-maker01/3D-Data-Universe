import { useRef, useState } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  id: string;
  position: [number, number, number];
  color: string;
  size: number;
  onSelect: (id : string) => void;
};

export default function Planet({ id, position, color, size, onSelect }: Props) {
  const meshRef = useRef<Mesh>(null!);

  const [hovered, setHovered] = useState(false);

  useFrame(( {clock}) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(t) * 0.002;
    }
  });

  return(
    <mesh 
      ref={meshRef} 
      position={position}
      onClick={() => onSelect(id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      >

      <sphereGeometry args={[size, 32, 32]} />

      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.4}
      />
    </mesh>
  );
}