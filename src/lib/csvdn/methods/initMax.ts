import { CSVDN } from '../../csvdn';

export function initMax(this: CSVDN): number[] {
  let max = [];
  for (let i = 0; i < this.normhead.length; i++) {
    let column = this.getColumn(i);
    max.push(CSVDN.utils.findLargest(column))
  }
  return max;
}
