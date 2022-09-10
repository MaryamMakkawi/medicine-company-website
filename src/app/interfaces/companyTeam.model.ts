export class CompanyTeam {
  constructor(
    public id: number,
    public companyId: number,
    public userId: number,
    public position: string,
    public description: string
  ) {}
}
