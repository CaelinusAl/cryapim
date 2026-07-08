import matrix from "@/content/matrix.tr.json";

export type MatrixLayer = (typeof matrix.layers)[number];
export type MatrixContent = typeof matrix;

export function getMatrix(): MatrixContent {
  return matrix;
}
