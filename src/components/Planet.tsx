import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  position: [number, number, number];
  color: string;
  size: number;
};

export default function Planet({ position, color, size }: Props) {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return(
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}