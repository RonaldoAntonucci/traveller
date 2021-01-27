export default interface IController<IRequest, IResponse> {
  index?: (req: IRequest, res: IResponse) => Promise<IResponse>;

  show?: (req: IRequest, res: IResponse) => Promise<IResponse>;

  create?: (req: IRequest, res: IResponse) => Promise<IResponse>;

  update?: (req: IRequest, res: IResponse) => Promise<IResponse>;

  delete?: (req: IRequest, res: IResponse) => Promise<IResponse>;
}
