export type Node = {
  id:string;
  position: [number, number, number];
  color: string;
  size: number;
}

export const nodes: Node[] = [
  { id: "projects", position: [3, 0, 0], color: "#9c29e9", size: 1},
  { id: "skills", position: [-3, 1, 0], color: "#66e9f2", size: 0.8},
  { id: "activity", position: [0, 2, -2], color: "#61ea1d", size: 0.7},
];
