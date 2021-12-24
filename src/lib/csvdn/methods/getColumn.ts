import { CSVDN } from "../../csvdn";

export function getColumn(this: CSVDN, h: number) {
  let stream: any[] = [];
  for (let i = 0; i < this.content.length; i++) {
    stream.push(this.content[i][h]);
  }
  return stream;
}
