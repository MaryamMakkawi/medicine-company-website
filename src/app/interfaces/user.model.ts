export class User {
  constructor(
    private accessToken: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public id: number,
    public userImage: string,
    public regionId: number,
    public cityId: number,
    public countryId: number,
    public region: string,
    public city: string,
    public country: string,
    public role: number,
    public specialMark: string,
    public contacts: string[],
    public isAuth?: boolean
  ) {}
  getToken() {
    return this.accessToken;
  }
}
