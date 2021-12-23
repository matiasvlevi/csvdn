import * as fs from 'fs';
import { Logger } from './logger';
import { Utils } from './utils';
import { Default } from './defaults';

type OperationT = {
  [key: string]: (doc: CSVDN, col: number) => any;
}

export class CSVDN {

  public readonly content: string[][];
  public data: number[][];
  public head: string[];
  public normhead: string[];
  public rules: any;
  public nonValid: string[];
  public max_: number[];
  public min_: number[];
  constructor(path: string) {
    let csvdoc: any = CSVDN.read(path);
    this.nonValid = [];
    this.content = csvdoc.content;
    this.head = csvdoc.head;
    this.normhead = this.head;
    this.data = csvdoc.data;
    this.max_ = [];
    this.min_ = [];

    this.rules = {};
  }
  public static utils: any = Utils;
  public static operations: OperationT = {};
  public static customOperations: any = {};
  public static registerOperation(name: string, operation: any) {
    CSVDN.customOperations[name] = operation;
  }
  public add(key: string, opts: any) {
    this.rules[key] = opts;
  }
  public setRules(rules: any) {
    this.rules = rules;
  }
  public getColumn(h: number) {
    let stream: any[] = [];
    for (let i = 0; i < this.content.length; i++) {
      stream.push(this.content[i][h]);
    }
    return stream;
  }

  public checkIfLabel(h: number): boolean {
    let isLabel: boolean = false;
    for (let i = 0; i < this.content.length; i++) {
      if (Number(this.content[i][h]) != +this.content[i][h]) {
        isLabel = true;
        i = this.content.length;
      }
    }
    return isLabel;
  }
  public static toString(csv_: any[][]): string[][] {

    let csv: string[][] = [];
    for (let i = 0; i < csv_.length; i++) {
      let stream: string[] = [];
      for (let j = 0; j < csv_[i].length; j++) {
        stream.push(`${csv_[i][j]}`);
      }
      csv.push(stream);
    }
    return csv;

  }
  public static toNum(csv_: any[][]): number[][] {

    let csv: number[][] = [];
    for (let i = 0; i < csv_.length; i++) {
      let stream: number[] = [];
      for (let j = 0; j < csv_[i].length; j++) {
        stream.push(+csv_[i][j]);
      }
      csv.push(stream);
    }
    return csv;

  }
  public initMax(): number[] {
    let max = [];
    for (let i = 0; i < this.normhead.length; i++) {
      let column = this.getColumn(i);
      max.push(Utils.findLargest(column))
    }
    return max;
  }
  public initMin(): number[] {
    let min = [];
    for (let i = 0; i < this.normhead.length; i++) {
      let column = this.getColumn(i);
      min.push(Utils.findSmallest(column));
    }
    return min;
  }
  public max(col: number) {
    return this.max_[col];
  }
  public min(col: number) {
    return this.min_[col]
  }
  public log(options: any = Default.log): string {
    // Inherit default options for unspecified options
    let opt: any = {};
    opt = Object.assign(opt, Default.log);
    for (let c in opt) {
      if (options[c] !== undefined) {
        opt[c] = options[c]
      }
    }

    let csv = this.getFile(opt);
    console.log(csv);
    return csv;
  }
  public getFile(options: any) {
    let mstr: string = '';

    // Inherit default options for unspecified options
    let opt: any = {};
    opt = Object.assign(opt, Default.csvExport);
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
  public isValid() {
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
  public countLabels(col: number): string[] {
    let cases: string[] = [];
    for (let i = 0; i < this.content.length; i++) {
      let value = this.content[i][col];
      if (cases.indexOf(value) === -1) {
        cases.push(value);
      }
    }
    return cases;
  }
  public findLabels(col: number, n: number = -1) {
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
  public applyCSV(streams: number[][]) {
    let data: number[][] = [];
    let len: number = 0;
    if (streams.length >= 1) {
      len = streams[0].length;
      for (let i = 0; i < len; i++) {
        let stream: number[] = new Array(streams.length).fill(0);
        for (let j = 0; j < streams.length; j++) {
          stream[j] = streams[j][i];
        }
        data.push(stream)
      }
      this.data = data;
    }
  }
  public normalize() {
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
  public static transpose(matrix: number[][]) {
    let ans: number[][] = [];
    for (let i = 0; i < matrix[i].length; i++) {
      ans[i] = [];
      for (let j = 0; j < matrix.length; j++) {
        ans[i][j] = matrix[j][i]
      }
    }
    return ans;
  }
  public static concatColumns(main: number[][], include: number[][]) {
    for (let i = 0; i < main.length; i++) {
      main[i].concat(include[i])
    }
    return main;
  }
  public getData(): number[][] {
    let data: number[][] = this.data;
    return data;
  }
  public scanLabels(h: number) {
    let found: string[] = [];
    for (let i = 0; i < this.content.length; i++) {
      let value = this.content[i][h];
      if (!found.includes(value)) {
        found.push(value);
      }
    }
    return found;
  }
  public static removeWhiteSpace(label: string) {
    return label.replace(/.*?( )?/gm, '');
  }
  public static read(path: string) {
    // Read file & format into string jagged array
    let content = fs.readFileSync(path, 'utf8')
      .split('\r\n')
      .map((x: string) => x.split(',')
        .map(z => {
          return CSVDN.removeWhiteSpace(z);
        })
      );

    let head = content.splice(0, 1)[0];
    let s: number = head.length > 1 ? 1 : 0;
    // Filter out empty lines
    content = content.filter((x: string[]) => {
      return x.length > s;
    });
    let data: number[][] = new Array(content.length).fill(new Array(head.length).fill(0));

    return {
      content,
      head,
      data
    }
  }
}


