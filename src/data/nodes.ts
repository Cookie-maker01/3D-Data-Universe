export type Node = {
  id:string;
  position: [number, number, number];
  color: string;
  size: number;
}

export type Connection = {
  from: string;
  to: string;
}

export const nodes: Node[] = [
  { id: "projects", position: [3, 0, 0], color: "#4f8cff", size: 1},
  { id: "skills", position: [-3, 1, 0], color: "#00ffcc", size: 0.8},
  { id: "activity", position: [0, 2, -2], color: "#ff66cc", size: 0.7},
];

export const connections = [
  { from: "projects", to: "skills" },
  { from: "skills", to: "activity" },
  { from: "activity", to: "projects"},
];