export function longest<T>(arrays: T[][]): T[] {
  let longestIndex = 0;
  for (let i = longestIndex + 1; i < arrays.length; i++) {
    if (arrays[i].length > arrays[longestIndex].length) {
      longestIndex = i;
    }
  }
  return arrays[longestIndex];
}
