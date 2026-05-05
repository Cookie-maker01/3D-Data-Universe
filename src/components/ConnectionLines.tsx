import { useMemo } from "react";
import * as THREE from "three";
import { nodes, connections } from "../data/nodes";

export default function ConnectionLines() {
  const lines = useMemo(() =>{
    return connections.map((conn) => {
      const from = nodes.find((n) => n.id === conn.from)!;
      const to =nodes.find((n) => n.id === conn.to)!;

      return {
        from: new THREE.Vector3(...from.position),
        to: new THREE.Vector3(...to.position),
      };
    });
  }, []);

  return (
    <>
      {lines.map((line, i) =>{
        const points =[line.from, line.to];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return(
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial color="#4f8cff" opacity={0.6} transparent />
          </line>
        );
      })}
    </>
  );
}