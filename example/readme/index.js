const { CSVDN } = require('../../bin/main.js');
const fs = require('fs');

let csv = new CSVDN('./sample.csv');

// csv.add('Age', {
//   mode: 'map'
// });

csv.add('Sex', {
  mode: 'bool'
})

csv.add('Heartrate', {
  mode: 'map'
})

csv.normalize();

csv.log({ normalized: true });

let file = csv.getFile();
fs.writeFileSync('./sample_norm.csv', file, 'utf8');