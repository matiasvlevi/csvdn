import { CSVDN } from '../../csvdn';
import { Logger } from '../../logger';

export function findLabels(this: CSVDN, col: number, n: number = -1) {
  let cases: string[] = [];

  for (let i = 0; i < this.content.length; i++) {
    let value: string = this.content[i][col];
    let index: number = cases.indexOf(value);
    if (index === -1) {
      if (cases.length >= n) {
        Logger.error(`This datastream has more labels than expected ${n}`);
        return cases;
      };
      cases.push(value);
    }
  }
  if (cases.length < n) {
    Logger.error(`This datastream has more labels than expected ${n}`);
  }
  return cases;
}