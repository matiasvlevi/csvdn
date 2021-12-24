import { CSVDN } from '../../csvdn';

export function checkIfLabel(this: CSVDN, h: number): boolean {
  let isLabel: boolean = false;
  for (let i = 0; i < this.content.length; i++) {
    if (Number(this.content[i][h]) != +this.content[i][h]) {
      isLabel = true;
      i = this.content.length;
    }
  }
  return isLabel;
}