export class OfferDetails {
  constructor(
    public medicineName: string,
    public medicinePrice: number,
    public medicineNetPrice: number,
    public quantity: string,
    public extraMedicineName: string,
    public extraMedicinePrice: number,
    public extraMedicineNetPrice: number,
    public extraQuantity: number,
  ) {}
}
