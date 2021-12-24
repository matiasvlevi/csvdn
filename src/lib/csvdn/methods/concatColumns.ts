export function concatColumns(main: number[][], include: number[][]) {
  for (let i = 0; i < main.length; i++) {
    main[i].concat(include[i])
  }
  return main;
}