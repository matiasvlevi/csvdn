export function transpose(matrix: number[][]) {
  let ans: number[][] = [];
  for (let i = 0; i < matrix[i].length; i++) {
    ans[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      ans[i][j] = matrix[j][i]
    }
  }
  return ans;
}