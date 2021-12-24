import { CSVDN } from '../../csvdn'
import * as fs from 'fs';

export function read(path: string) {
  // Read file & format into string jagged array
  let content = fs.readFileSync(path, 'utf8')
    .split('\r\n')
    .map((x: string) => x.split(',')
      .map(z => {
        return CSVDN.removeWhiteSpace(z);
      })
    );

  let head = content.splice(0, 1)[0];
  let s: number = head.length > 1 ? 1 : 0;
  // Filter out empty lines
  content = content.filter((x: string[]) => {
    return x.length > s;
  });
  let data: number[][] = new Array(content.length).fill(new Array(head.length).fill(0));

  return {
    content,
    head,
    data
  }
}