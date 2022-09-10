import { CompanyTeam } from "./companyTeam.model";
import { Contact } from "./contact.model";

export class CompanyInfo {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public img: string,
    public logo: string,
    public numOfEmployee: number,
    public companyTeams: CompanyTeam[],
    public contacts: Contact[]
  ) {}
}
