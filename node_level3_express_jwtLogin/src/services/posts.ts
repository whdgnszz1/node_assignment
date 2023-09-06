import {
  AllPostResponse,
  CreatePostRequest,
  OnePostResponse,
  UpdatePostRequest,
} from "../dtos/posts";
import PostRepository from "../repositories/posts";

class PostService {
  createPost = async (user: Express.User, post: CreatePostRequest) => {
    const result = await PostRepository.createPost(user, post);
    return result;
  };

  getAllPosts = async (): Promise<AllPostResponse[]> => {
    const result: AllPostResponse[] = await PostRepository.getAllPosts();
    return result;
  };

  getOnePost = async (postId: number): Promise<OnePostResponse> => {
    const result = await PostRepository.getOnePost(postId);
    return result;
  };

  updateOnePost = async (
    user: Express.User,
    postId: number,
    updatePostRequest: UpdatePostRequest
  ) => {
    const result = await PostRepository.updateOnePost(
      user,
      postId,
      updatePostRequest
    );
    return result;
  };

  deleteOnePost = async (
    user: Express.User,
    postId: number,
    password: string
  ) => {
    const result = await PostRepository.deleteOnePost(user, postId, password);
    return result;
  };
}

export default new PostService();
