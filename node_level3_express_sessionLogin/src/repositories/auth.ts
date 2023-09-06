import { SignUpRequest } from "../dtos/auth";
import { CustomError } from "../errors/customError";
import prisma from "../utils/prisma/index";
import bcrypt from "bcrypt";

class UsersRepository {
  signUp = async (user: SignUpRequest) => {
    try {
      const existUser = await prisma.users.findFirst({
        where: { nickname: user.nickname },
      });
      if (existUser) {
        throw new CustomError("중복된 닉네임입니다.", 412);
      }
      if (user.password !== user.confirm) {
        throw new CustomError("패스워드가 일치하지 않습니다.", 412);
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await prisma.users.create({
        data: { nickname: user.nickname, password: hashedPassword },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // login = (user: LoginRequest) => {};
}

export default new UsersRepository();
