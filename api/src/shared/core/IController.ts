export default interface IController<IRequest, IResponse> {
  create(req: IRequest, res: IResponse): Promise<IResponse>;
}
