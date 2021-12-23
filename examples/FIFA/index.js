const { CSVDN } = require('../../bin/main.js');

let csv = new CSVDN('./FIFA_2018.csv');

csv.log();

csv.add('Team', {
  mode: 'binary'
})

csv.normalize();

csv.log({ normalized: true })