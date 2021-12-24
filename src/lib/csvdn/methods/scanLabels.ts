import { CSVDN } from '../../csvdn'

export function scanLabels(this: CSVDN, h: number) {
  let found: string[] = [];
  for (let i = 0; i < this.content.length; i++) {
    let value = this.content[i][h];
    if (!found.includes(value)) {
      found.push(value);
    }
  }
  return found;
}