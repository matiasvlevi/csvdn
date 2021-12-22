const { CSVDN } = require('../../bin/main.js');
const fs = require('fs');

let csv = new CSVDN('./drugs.csv');
csv.log();

// Normalization Config
csv.add('Age', {
  mode: 'map'
});
csv.add('Sex', {
  mode: 'bool'
});

let scale = {
  mode: 'map',
  labels: ['LOW', 'NORMAL', 'HIGH']
}
csv.add('BP', scale);
csv.add('Cholesterol', scale);

csv.add('Na_to_K', {
  mode: 'map'
});

csv.add('Drug', {
  mode: 'map',
  labels: ['drugA', 'drugB', 'drugC', 'drugX', 'DrugY']
});


csv.normalize();
csv.log({ normalized: true });

let file = csv.getFile();
fs.writeFileSync('./drugs_norm.csv', file, 'utf8');