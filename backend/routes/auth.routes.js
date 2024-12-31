import express from "express";
import {
  signup,
  login,
  logout,
  authCheck,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

// /api/auth/signup
router.post("/signup", signup);

// /api/auth/login
router.post("/login", login);

// /api/auth/logout
router.post("/logout", logout);

// /api/auth/authcheck
router.get("/authcheck", protectedRoute, authCheck);

export default router;
