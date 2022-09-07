export class Medicine {
  constructor(
    public barcode: string,
    public productName: string,
    public indications: string,
    public packing: string,
    public composition: number,
    public medicineImages: [],
    public expiredDate: number,
    public price: string,
    public netPrice: string,
    public pharmaceuticalFormId: string,
    public categoryId: string,

  ) {}
}
