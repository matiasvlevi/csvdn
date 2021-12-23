const { CSVDN } = require('../../bin/main.js');
const fs = require('fs');

let csv = new CSVDN('./sample.csv');

csv.log();

CSVDN.registerOperation('myOp', (values, config) => {
  // Normalize (Divide by the maximum value in order to bound all the values to 1)
  let ans = [];
  for (let i = 0; i < values.length; i++) {
    ans.push(values[i] / config.max);
  }
  return ans;
});

csv.add('Age', {
  mode: 'myOp',
});

CSVDN.registerOperation('gender', (values, config) => {
  // Normalize (Divide by the length in order to bound all the values to 1)
  let ans = [];
  for (let i = 0; i < values.length; i++) {
    let index = config.labels.indexOf(values[i]);
    if (index !== -1) {
      ans.push((index + 1) / config.labels.length);
    }

  }
  return ans;
});

csv.add('Sex', {
  mode: 'gender',
  labels: ['F', 'M', 'O']
})

csv.add('Heartrate', {
  mode: 'map'
})


csv.normalize();

csv.log({ normalized: true });





let file = csv.getFile();
console.log(file)
fs.writeFileSync('./sample_norm.csv', file, 'utf8');