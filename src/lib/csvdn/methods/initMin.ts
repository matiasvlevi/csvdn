import { CSVDN } from '../../csvdn';

export function initMin(this: CSVDN): number[] {
  let min = [];
  for (let i = 0; i < this.normhead.length; i++) {
    let column = this.getColumn(i);
    min.push(CSVDN.utils.findSmallest(column));
  }
  return min;
}
