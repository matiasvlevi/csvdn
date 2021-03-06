# CSVDN

CSVDN normalizes column data from csv files.

## Install

```sh
npm i csvdn
```

## Import

```js
const { CSVDN } = require('csvdn');
```

<br/>

## Example

Here is a csv file with sample data
```csv
Age,Sex,Heartrate
19, M, 99
23, F, 98
45, M, 89
26, M, 93
34, F, 94
21, F, 96
```

Create a csv normalizer instance with your csv file path

```js
let csv = new CSVDN('./path/to/your/file.csv');
```

Specify the column names of your data and their normalization operation. If a column is not specified here, it will not be included in the output file.

```js
csv.add('Age',{
  mode:'map'
});

csv.add('Sex',{
  mode:'bool'
})

csv.add('Heartrate',{
  mode:'map'
})
```

Call the `normalize` method

```js
csv.normalize();
```

Save the normalized CSV

```js
let file = csv.getFile();
fs.writeFileSync('./your/write/path/file2.csv', file, 'utf8');
```

This would create a normalized version of this csv file:

```csv
Age,Sex,Heartrate
0.4222222222222222,0,1
0.5111111111111111,1,0.98989898989899
1,0,0.898989898989899
0.5777777777777777,0,0.9393939393939394
0.7555555555555555,1,0.9494949494949495
0.4666666666666667,1,0.9696969696969697
```

<br/>

## Log

You can use the log method in order to print the file

```js
csv.log();
csv.log({ normalized: true });
```

You can specify other options: 

| Property   | Type   | Description                                |
|------------|--------|--------------------------------------------|
| normalized | bool   | log normalized data if true                |
| join       | string | character with which to join columns       |
| header     | bool   | include the header                         |
| tab        | bool   | include tabulation                         |
| align      | string | Align text either `'left'`, `'right'`      |
| color      | bool   | whether or not to include color in the log |


<br/>

## get the file as a string

```js
let normfile = csv.getFile();
```

This method acts exactly as `log`, but returns a string of the supposed log. The same options apply for `getFile`, altough the default config is opimal for writing csv's.

<br/>

## Register Operation
If you want to normalize a column with some other operation than the ones provided as default, you can register your own operation.

Specify a name, and an operation function.
The operation function is fed 2 arguments, a list of the values in the column, a config object containing usefull properties. This function must also return a list of numeric normalized values.
```js
CSVDN.registerOperation('myOperation', (values, config) => {
  let ans = [];

  // Divide by maximum value in the column.
  for (let i = 0; i < values.length; i++) {
    ans.push(values[i] / config.max);
  }

  return ans;
});
```
```js
csv.add('MyColumn',{
  mode:'myOperation'
});
```

<br/>

### Add config properties

Properties added can be found in the config object.

```js
CSVDN.registerOperation('myOperation', (values, config) => {
  // `config` also includes specified properties, try:
  // console.log(config.foo, config.bar)
});

```
```js
csv.add('MyColumn',{
  mode:'myOperation',
  foo:'foo',
  bar:'bar'
});
```

We can use the properties `foo` and `bar` supplied by `config`
