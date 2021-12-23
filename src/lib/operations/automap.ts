import { CSVDN } from '../normalizer';
import { Logger } from '../logger';
export function automap(doc: CSVDN, col: number): any {
  let labels: string[] = [];
  if (doc.checkIfLabel(col)) {
    let labels_: string[] = doc.rules[doc.head[col]].labels;
    if (labels_ !== undefined) {
      labels = labels_;
    } else {
      labels = doc.scanLabels(col);
    }
  }
  console.log(labels)
  let stream: number[] = [];
  for (let i = 0; i < doc.content.length; i++) {
    let value: number = 0;
    if (labels.length > 0) {
      value = labels.indexOf(doc.content[i][col]);
    } else {
      value = Number(doc.content[i][col]);
    }
    if (value !== -1) {
      stream.push(value);
    } else {
      let foundLabels = doc.countLabels(col);
      let errmsg = `This datastream has more labels than expected,`
        + ` ${labels.length} were specified and got ${foundLabels.length} different labels\n`
        + `specified: ( ${labels.join(' , ')} )\n`
        + `found: ( ${foundLabels.join(' , ')} )\n`;
      Logger.error(errmsg);
    }
  }
  let record: number = CSVDN.utils.findLargest(stream);
  // Normalize
  for (let i = 0; i < stream.length; i++) {
    stream[i] = stream[i] / record;
  }
  return stream;
}