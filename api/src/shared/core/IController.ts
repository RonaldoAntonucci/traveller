export default interface IController<IRequest, IResponse> {
  find?: (req: IRequest, res: IResponse) => Promise<IResponse>;

  create?: (req: IRequest, res: IResponse) => Promise<IResponse>;
}
