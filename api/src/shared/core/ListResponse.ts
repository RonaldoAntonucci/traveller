export interface IListResponseProps<Entity = unknown> {
  data: Entity[];

  total: number;

  offset: number;

  count: number;
}

export default class ListResponse<Entity = unknown> {
  public data: Entity[];

  public total: number;

  public offset: number;

  public count: number;

  constructor(data?: IListResponseProps<Entity>) {
    if (data) {
      this.data = data.data;
      this.total = data.total;
      this.offset = data.offset;
      this.count = data.count;
    }
  }
}
