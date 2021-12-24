




// Methods
import * as methods from './csvdn/index';

// Utils & Default configs
import { Utils } from './csvdn/utils/utils';
import { Default } from './csvdn/defaults/defaults';

// typedefs
import { OperationT } from './operations/typedef';

export class CSVDN {

  public readonly content: string[][];
  public data: number[][];
  public head: string[];
  public normhead: string[];
  public rules: any;
  public nonValid: string[];
  public max_: number[];
  public min_: number[];

  // Static properties
  public static utils: any = Utils;
  public static default: any = Default;
  public static operations: OperationT = {};
  public static customOperations: any = {};

  // Static methods
  public static toString = methods.toString;
  public static toNum = methods.toNum;
  public static transpose = methods.transpose;
  public static read = methods.read;
  public static registerOperation = methods.registerOperation;
  public static concatColumns = methods.concatColumns;
  public static removeWhiteSpace = methods.removeWhiteSpace;

  // Instance methods
  public initMax = methods.initMax.bind(this);
  public initMin = methods.initMin.bind(this);
  public max = methods.max.bind(this);
  public min = methods.min.bind(this);
  public normalize = methods.normalize.bind(this);
  public getFile = methods.getFile.bind(this);
  public applyCSV = methods.applyCSV.bind(this);
  public checkIfLabel = methods.checkIfLabel.bind(this);
  public isValid = methods.isValid.bind(this);
  public log = methods.log.bind(this);
  public findLabels = methods.findLabels.bind(this);
  public scanLabels = methods.scanLabels.bind(this);
  public countLabels = methods.countLabels.bind(this);

  // Getters
  public getColumn = methods.getColumn.bind(this);
  public getData = methods.getData.bind(this);

  // Setters
  public add = methods.add.bind(this);
  public setRules = methods.setRules.bind(this);

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
}


