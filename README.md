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