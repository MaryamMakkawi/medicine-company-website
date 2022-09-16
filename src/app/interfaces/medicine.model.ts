export class Medicine {
  constructor(
    public barcode: string,
    public productName: string,
    public indications: string,
    public id: number,
    public packing: number,
    public composition: number,
    public imgs: [],
    public expiredDate: number,
    public price: number,
    public netPrice: number,
    public pharmaceuticalForms: [{id:number,name:string}],
    public categories: [{id:number,name:string}],

  ) {}
}
