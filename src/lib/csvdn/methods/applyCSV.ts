import { CSVDN } from "../../csvdn";

export function applyCSV(this: CSVDN, streams: number[][]) {
  let data: number[][] = [];
  let len: number = 0;
  if (streams.length >= 1) {
    len = streams[0].length;
    for (let i = 0; i < len; i++) {
      let stream: number[] = new Array(streams.length).fill(0);
      for (let j = 0; j < streams.length; j++) {
        stream[j] = streams[j][i];
      }
      data.push(stream)
    }
    this.data = data;
  }
}