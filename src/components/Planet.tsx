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
      meshRef.current.rotation.y += 0.003;

      meshRef.current.position.x =
        position[0] + Math.sin(t * 0.4 + position[0]) * 0.2;

      meshRef.current.position.z =
        position[2] + Math.cos(t *0.4 + position[0]) * 0.2;

      meshRef.current.position.y = 
        position[1] + Math.sin(t) * 0.08;

      const pulse = Math.sin(t * 1.5) * 0.08 + 0.22;

      (meshRef.current.material as any).emissiveIntensity = 
        hovered ? 0.45 : pulse;
    }

    if (meshRef.current) {
      const pulse = Math.sin(t* 2) * 0.3 + 0.7;

      (meshRef.current.material as any).emissiveIntensity =
        hovered ? 1.5 : pulse;
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
        emissiveIntensity={0.25}
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}