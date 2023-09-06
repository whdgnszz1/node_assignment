import { verifyToken } from "./../middlewares/auth";
import express from "express";
import { login, logout, signUp, editProfile } from "../controllers/auth";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { imageUpload } from "../middlewares/imageUpload";
const router = express.Router();

// 회원가입
router.post("/signup", signUp);

//로그인
router.post("/login", login);

// 로그아웃
router.post("/logout", logout);

// 프로필 수정
router.put(
  "/profile",
  verifyToken,
  ensureAuthenticated,
  imageUpload,
  editProfile
);

export default router;
