import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostRequestDto, PutRequestDto } from '../dto/posts.request.dto';
import { Post } from '../posts.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getAllPosts() {
    const posts = await this.postModel.find({}).select('-content');
    const result = posts.map((post) => post.readOnlyData);
    return result;
  }

  async createPost(body: PostRequestDto) {
    const { user, password, title, content } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.postModel.create({
      user,
      title,
      content,
      password: hashedPassword,
    });
    return { message: '게시글을 생성하였습니다.' };
  }

  async getOnePost(id: string) {
    const objectId = new Types.ObjectId(id);
    const post = await this.postModel.findById(objectId);
    if (!post) {
      throw new HttpException('존재하지 않는 게시글입니다.', 404);
    }

    return post.readOnlyData;
  }

  async updateOnePost(id: string, body: PutRequestDto) {
    const { password, title, content } = body;
    const objectId = new Types.ObjectId(id);
    const post = await this.postModel.findById(objectId);
    if (!post) {
      throw new HttpException('존재하지 않는 게시글입니다.', 404);
    }
    const validatePassword = bcrypt.compare(password, post.password);
    if (!validatePassword) {
      throw new HttpException('비밀번호가 일치하지 않습니다', 403);
    }

    post.title = title;
    post.content = content;

    await post.save();

    return { message: '게시글을 수정하였습니다.' };
  }

  async deletePost(id: string, body: any) {
    const { password } = body;
    const objectId = new Types.ObjectId(id);
    const post = await this.postModel.findById(objectId);
    if (!post) {
      throw new HttpException('존재하지 않는 게시글입니다.', 404);
    }
    const validatePassword = bcrypt.compare(password, post.password);
    if (!validatePassword) {
      throw new HttpException('비밀번호가 일치하지 않습니다', 403);
    }

    await this.postModel.deleteOne(objectId);

    return { message: '게시글을 삭제하였습니다.' };
  }
}
