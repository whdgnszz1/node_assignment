import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Users } from './users.schema';
import { Model } from 'mongoose';
import { LoginRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async findUserByWithoutPassword(userId: string): Promise<Users | null> {
    const user = await this.usersModel.findById(userId).select('-password');
    return user;
  }

  async existsByNickname(nickname: string): Promise<Users | null> {
    try {
      const result = await this.usersModel.findOne({ nickname });
      return result;
    } catch (error) {
      throw new HttpException('DB error', 400);
    }
  }

  async create(user: LoginRequestDto): Promise<Users> {
    try {
      const result = await this.usersModel.create(user);
      return result;
    } catch (error) {
      throw new HttpException('DB error', 400);
    }
  }
}
