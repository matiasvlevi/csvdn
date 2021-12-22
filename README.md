# CSVDN

CSVDN helps with normalizing data from csv files.

### Example

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

For data to be used in a machine learning context, we need to normalize it.

```js

let csv = new CSVDN('./path/to/your/file.csv');

csv.add('Age',{
  mode:'map'
});

csv.add('Sex',{
  mode:'bool'
})

csv.add('Heartrate',{
  mode:'map'
})

csv.normalize();

let file = csv.getFile();
fs.writeFileSync('./your/write/path/file2.csv', file, 'utf8');
```

This configuration would normalize your csv and write it ina new file

You can also use some utilities to log the file in the console:

```js
csv.log();
```

You can also specify some log options: 

```js
csv.log({ normalized: true });
csv.log({ align:'left' });
csv.log({ tab:false });
csv.log({ header: false });
csv.log({ join:' | ' });
```