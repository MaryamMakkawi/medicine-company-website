export class Contact {
  constructor(
    public id: number,
    public companyId: number,
    public userId: number,
    public type: number,
    public content: string
  ) {}
}
