export class Offer {
  constructor(
    public id: number,
    public name: string,
    public creationDate: string,
    public offerStatus: number,
    public orderCount: number
  ) {}
}
