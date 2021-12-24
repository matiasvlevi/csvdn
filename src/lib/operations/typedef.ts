import { CSVDN } from '../csvdn';

export type OperationT = {
  [key: string]: (doc: CSVDN, col: number) => any;
}

