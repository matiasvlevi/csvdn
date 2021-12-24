import { CSVDN } from '../../csvdn';

export function log(this: CSVDN, options: any = CSVDN.default.log): string {
  // Inherit default options for unspecified options
  let opt: any = {};
  opt = Object.assign(opt, CSVDN.default.log);
  for (let c in opt) {
    if (options[c] !== undefined) {
      opt[c] = options[c]
    }
  }

  let csv = this.getFile(opt);
  console.log(csv);
  return csv;
}
