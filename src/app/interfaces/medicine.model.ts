export class Medicine {
  constructor(
    public barcode: string,
    public productName: string,
    public indications: string,
    public packing: number,
    public composition: number,
    public imgs: [],
    public expiredDate: number,
    public price: number,
    public netPrice: number,
    public pharmaceuticalForm: {id:number,name:string},
    public category: {id:number,name:string},

  ) {}
}
