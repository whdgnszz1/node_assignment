import { Request, Response, NextFunction } from "express";
import {
  AllCommentResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../dtos/comments";
import asyncHandler from "../lib/asyncHandler";
import CommentsService from "../services/comments";

// 댓글 생성
export const createComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    if (!content) {
      return res
        .status(412)
        .send({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const user = res.locals.decoded;
    if (!user) {
      return res.status(401).send({ message: "로그인이 필요한 기능입니다." });
    }

    const postId = Number(req.params.postId);
    const newComment: CreateCommentRequest = req.body;
    await CommentsService.createComment(user, postId, newComment);
    res.send({ message: "댓글을 생성하였습니다." });
  }
);

// 전체 댓글 조회
export const getAllComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allComments: AllCommentResponse[] =
      await CommentsService.getAllComments();
    res.json({ comments: allComments });
  }
);

// 특정 댓글 조회
export const getOneComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId: number = Number(req.params.commentId);
    const comment = await CommentsService.getOneComment(commentId);
    res.json({ comment });
  }
);

// 특정 댓글 수정
export const updateOneComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    const postId: number = +req.params.postId;

    if (!content) {
      return res
        .status(412)
        .send({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const user = res.locals.decoded;
    if (!user) {
      return res.status(401).send({ message: "로그인이 필요한 기능입니다." });
    }
    const updateComment: UpdateCommentRequest = req.body;
    const commentId: number = Number(req.params.commentId);
    await CommentsService.updateOneComment(
      user,
      postId,
      commentId,
      updateComment
    );
    res.send({ message: "댓글을 수정하였습니다." });
  }
);

// 특정 댓글 삭제
export const deleteOneComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId: number = +req.params.postId;

    const user = res.locals.decoded;
    if (!user) {
      return res.status(401).send({ message: "로그인이 필요한 기능입니다." });
    }
    const commentId: number = Number(req.params.commentId);
    const comment = await CommentsService.deleteOneComment(
      user,
      postId,
      commentId
    );
    res.send({ message: "댓글을 삭제하였습니다." });
  }
);
