const { CSVDN } = require('../../bin/main.js');
const fs = require('fs');

let csv = new CSVDN('./sample.csv');

csv.log();

csv.add('Age', {
  mode: 'map'
});

csv.add('Sex', {
  mode: 'bool'
})

csv.add('Heartrate', {
  mode: 'map'
})


csv.normalize();

csv.log({ normalized: true });


CSVDN.registerOperation('myOp', (x) => (x * 2));


// let file = csv.getFile();
// console.log(file)
// fs.writeFileSync('./sample_norm.csv', file, 'utf8');