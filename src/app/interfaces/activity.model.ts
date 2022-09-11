export class Activity {
  constructor(
    public id: number,
    public type: number,
    public publishedDate: string,
    public content: string,
    public isRead: boolean,
    public imgs: string[]
  ) {}
}
