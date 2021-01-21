/* eslint-disable @typescript-eslint/ban-types */

export type OrderType = 'DESC' | 'ASC' | undefined;

interface IPaginationParamsProps {
  offset?: number | string | undefined;
  count?: number | string | undefined;
  order?: string | undefined;
}

export default class PaginationParams {
  public offset: number;

  public count: number;

  public order: OrderType;

  constructor(data?: IPaginationParamsProps) {
    this.offset = 0;
    this.count = 20;
    this.order = 'DESC';

    if (data) {
      if (data.offset && Number(data.offset)) {
        this.offset = Number(data.offset);
      }
      if (data.count && Number(data.count)) {
        this.count = Number(data.count);
      }
      if (data.order && (data.order === 'ASC' || data.order === 'DESC')) {
        this.order = data.order;
      }
    }
  }
}
