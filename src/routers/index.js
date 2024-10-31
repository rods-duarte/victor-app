import { Router } from "express";
import authRouter from "./authRouter.js";
import pagesRouter from "./pagesRouter.js";

const router = Router();

router.use('/api/auth', authRouter);

// pages
router.use('/pages', pagesRouter);

export default router;
