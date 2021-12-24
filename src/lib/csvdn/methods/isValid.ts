import { CSVDN } from '../../csvdn';
import { Logger } from '../../logger';

export function isValid(this: CSVDN) {
  let nonValid: string[] = [];
  for (let i = 0; i < this.head.length; i++) {
    if (this.rules[this.head[i]] === undefined) {
      nonValid.push(this.head[i]);
    } else if (this.rules[this.head[i]].mode === undefined) {
      nonValid.push(this.head[i]);
    }
  }
  let present = this.head.filter(x => {
    return !nonValid.includes(x);
  })
  this.normhead = present;
  if (nonValid.length > 0) {
    Logger.warn(`These columns were not assigned to a normalization operation\n ( ${nonValid.join(' , ')} )\n`)
  }
  return {
    err: nonValid.length > 0 ? true : false,
    nonValid
  };
}