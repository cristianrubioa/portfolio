declare module 'd3-force-3d' {
  export function forceCollide<T>(
    radius?: number | ((node: T, i: number, nodes: T[]) => number),
  ): unknown;

  export function forceManyBody(): {
    distanceMax(distance: number): unknown;
  };
}
