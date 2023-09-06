import { LoginRequest, LoginResponse, SignUpRequest } from "../dtos/auth";
import UsersRepository from "../repositories/auth";

class UsersService {
  signUp = async (user: SignUpRequest) => {
    const newUser = await UsersRepository.signUp(user);
    return newUser;
  };

  login = async (user: LoginRequest) => {
    const result: LoginResponse = await UsersRepository.login(user);
    return result;
  };
}

export default new UsersService();
