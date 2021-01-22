import api from '../services/api';
import User from '../types/user';

interface SignInDTO {
  email: string;
  password: string;
}

interface SignInApiResponse {
  token: string;
  user: User;
}

class UsersRepository {
  private api: typeof api;

  constructor() {
    this.api = api;
  }

  public async signIn({
    email,
    password,
  }: SignInDTO): Promise<SignInApiResponse> {
    const { data } = await this.api.post<SignInApiResponse>('/signin/jwt', {
      password,
      email,
    });

    return { token: data.token, user: data.user };
  }
}

export default new UsersRepository();
