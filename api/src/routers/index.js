import { Router } from "express";
import authRouter from "./authRouter.js";
import pagesRouter from "./pagesRouter.js";
import studentsRouter from "./studentsRouter.js";
import { authMiddlewares } from "../middlewares/index.js";

const router = Router();
const { authenticateToken } = authMiddlewares;

// authentication
router.use('/api/auth', authRouter);

// students
router.use('/api/students', studentsRouter);

// pages
router.use('/pages', pagesRouter);

export default router;
