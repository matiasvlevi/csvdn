import { CSVDN } from '../normalizer';
import { Logger } from '../logger';
export function bool(doc: CSVDN, col: number): any {
  let labels = doc.findLabels(col, 2);
  let stream: number[] = [];
  for (let i = 0; i < doc.content.length; i++) {

    let value: number = labels.indexOf(doc.content[i][col]);
    if (value !== -1) {
      stream.push(value);
    } else {
      Logger.error('This datastream is not boolean');
    }

  }
  return stream;
}