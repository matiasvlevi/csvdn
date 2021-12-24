import { CSVDN } from '../../csvdn';
import { Logger } from '../../logger';

export function getFile(this: CSVDN, options: any) {
  let mstr: string = '';

  // Inherit default options for unspecified options
  let opt: any = {};
  opt = Object.assign(opt, CSVDN.default.csvExport);
  if (options !== undefined) {
    for (let c in opt) {
      if (options[c] !== undefined) {
        opt[c] = options[c]
      }
    }
  }


  let csv_: any[][] = opt.normalized ? this.data : this.content;
  let csv: string[][] = csv_;
  if (opt.header) {
    csv = CSVDN.toString([opt.normalized ? this.normhead : this.head].concat(csv_));
  }
  let spaces = Logger.findLargestString(csv);
  for (let i = 0; i < csv.length; i++) {

    let color: string = '';
    let colorReset: string = '';
    if (opt.color && opt.header && i === 0) {
      color = '\x1b[32m';
      colorReset = '\x1b[0m';
    }
    let str: string[] = [];
    for (let j = 0; j < csv[i].length; j++) {
      let rtab: string = '';
      let ltab: string = '';
      if (opt.tab) {
        let tab = new Array(spaces[j] - (`${csv[i][j]}`).length).join(' ');

        if (opt.align === 'left') {
          ltab = tab;
        } else if (opt.align === 'right') {
          rtab = tab;
        }
      }

      str.push(`${ltab}${csv[i][j]}${rtab}`);
    }
    mstr += `${color}${str.join(`${opt.join}`)}${colorReset}\n`;
  }
  return mstr;
}