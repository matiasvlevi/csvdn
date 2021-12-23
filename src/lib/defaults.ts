
class Default {
  constructor() { }
  public static csvExport: any = {
    tab: false,
    header: true,
    align: 'right',
    normalized: true,
    join: ',',
    color: false
  }
  public static log: any = {
    tab: true,
    header: true,
    align: 'right',
    normalized: false,
    join: '',
    color: true
  }
}

export { Default }