import { CSVDN } from '../normalizer';
import { Logger } from '../logger';
export function binary(doc: CSVDN, col: number): any {
  let labels: string[] = [];
  if (doc.checkIfLabel(col)) {
    let labels_: string[] = doc.rules[doc.head[col]].labels;
    if (labels_ !== undefined) {
      labels = labels_;
    } else {
      labels = doc.scanLabels(col);
    }
  } else {
    return new Array(doc.content.length).fill(NaN);
  }
  let streams: number[][] = new Array(doc.content.length).fill(new Array(labels.length).fill(0));
  for (let i = 0; i < doc.content.length; i++) {
    let value: number = 0;
    if (labels.length > 0) {
      value = labels.indexOf(doc.content[i][col]);
      if (value !== -1) {
        let row = new Array(labels.length).fill(0);
        row[value] = 1;
        streams[i] = row;

      }
    }
  }
  let del = doc.normhead.indexOf(doc.head[col])
  doc.normhead.splice(del, 1);
  for (let i = 0; i < streams[0].length; i++) {
    doc.normhead.push(`${doc.head[col]}(${labels[i]})`);
  }
  return streams;
}