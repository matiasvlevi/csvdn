import { CSVDN } from '../../csvdn'
import { Logger } from '../../logger'

export function normalize(this: CSVDN) {
  let streams: number[][] = [];
  let valid: any = this.isValid();
  this.nonValid = valid?.nonValid;

  let data: number[][] = new Array(this.content.length).fill(new Array(this.head.length - this.nonValid.length).fill(0));
  this.data = data;

  this.max_ = this.initMax();
  this.min_ = this.initMin();
  for (let h = 0; h < this.head.length; h++) {
    let addAsCol = true;
    let csvInclude: number[][] = [];
    if (!this.nonValid.includes(this.head[h])) {
      let rule: any = this.rules[this.head[h]];

      let datastream: any[];
      if (Object.keys(CSVDN.operations).includes(rule.mode)) {
        let func: (doc: CSVDN, col: number) => any = CSVDN.operations[rule.mode];

        datastream = func(this, h);
        if (!(typeof datastream[0] === 'number')) {
          addAsCol = false;
        }

      } else if (Object.keys(CSVDN.customOperations).includes(rule.mode)) {
        let func = CSVDN.customOperations[rule.mode];
        rule['max'] = this.max(h);
        rule['min'] = this.min(h);
        datastream = func(this.getColumn(h), rule);

      } else {
        datastream = new Array(this.content.length).fill(NaN);
        Logger.error(`Mode ${rule.mode} is not a valid normalization operation`);

      }
      if (!addAsCol) {
        csvInclude = (datastream);
      } else {
        streams.push(datastream);
      }

    }
    if (!addAsCol) {
      let nstream: any = streams.concat(CSVDN.transpose(csvInclude));
      streams = nstream;
    }
  }
  this.applyCSV(streams);
}