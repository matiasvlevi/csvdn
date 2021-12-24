
export function toNum(csv_: any[][]): number[][] {

  let csv: number[][] = [];
  for (let i = 0; i < csv_.length; i++) {
    let stream: number[] = [];
    for (let j = 0; j < csv_[i].length; j++) {
      stream.push(+csv_[i][j]);
    }
    csv.push(stream);
  }
  return csv;

}