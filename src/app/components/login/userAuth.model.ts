export class UserAuth {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public name?:string,
    public imgUrl?:string
  ) {}

  get token() {
    return this._token;
  }
}
