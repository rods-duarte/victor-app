import { Router } from "express";
import { createCertificate } from "../controllers/studentsController";

const studentsRouter = Router();

studentsRouter.post('/:studentId/certificate', createCertificate);

export default studentsRouter;