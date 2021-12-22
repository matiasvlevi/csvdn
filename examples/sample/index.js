const { CSVDN } = require('../../bin/main.js');
const fs = require('fs');

let csv = new CSVDN('./sample.csv');
csv.log();

// Normalization Config
csv.add('Age', {
  mode: 'map'
});
csv.add('Level', {
  mode: 'map',
  labels: ['junior', 'advanced', 'senior', 'master']
});
csv.add('Sex', {
  mode: 'bool'
});
csv.add('Height', {
  mode: 'map'
});
csv.add('Degree', {
  mode: 'bool'
});

csv.normalize();

csv.log({ normalized: true });

let file = csv.getFile();
fs.writeFileSync('./sample_norm.csv', file, 'utf8');