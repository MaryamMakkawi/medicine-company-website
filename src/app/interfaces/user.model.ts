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
// {
//   "id": 1,
//   "firstName": "maryam",
//   "lastName": "makkawi",
//   "regionId": null,
//   "cityId": null,
//   "countryId": null,
//   "img": null,
//   "role": null,
//   "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwianRpIjoiMSJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3QiLCJhdWQiOiJodHRwOlwvXC9sb2NhbGhvc3QiLCJqdGkiOiIxIiwiaWF0IjoxNjYyODI0OTQ1LCJuYmYiOjE2NjI4MjUwMDUsImV4cCI6MTc2MjcyNTk0NCwidWlkIjoiMSJ9.",
//   "email": "admin@admin.com",
//   "password": "$2y$13$njzERsIq1Ac1lgDEENV78Oy94ZNulagtt6dbRN55I7SZQ9P4g7boO",
//   "specialMark": null,
//   "contacts": [],
//   "region": null,
//   "city": null,
//   "country": null
// }
