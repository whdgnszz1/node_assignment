export type CreatePostRequest = {
  title: string;
  content: string;
};

export type CreatePostToDataBase = {
  userId: number;
  nickname: string;
  title: string;
  content: string;
};

export type UpdatePostRequest = {
  title: string;
  content: string;
};

export type AllPostResponse = {
  postId: number;
  userId: number;
  nickname: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OnePostResponse = {
  postId: number;
  userId: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
