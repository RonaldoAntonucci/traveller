export default interface IService<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
