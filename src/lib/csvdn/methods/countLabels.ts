import { CSVDN } from '../../csvdn';

export function countLabels(this: CSVDN, col: number): string[] {
  let cases: string[] = [];
  for (let i = 0; i < this.content.length; i++) {
    let value = this.content[i][col];
    if (cases.indexOf(value) === -1) {
      cases.push(value);
    }
  }
  return cases;
}