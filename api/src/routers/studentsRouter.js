import { Router } from "express";
import { studentsController } from "../controllers/index.js";
import { schemaMiddlewares } from "../middlewares/index.js";
import { certificateSchemas } from "../schemas/index.js";

const studentsRouter = Router();
const { validateSchema } = schemaMiddlewares;
const { createCertificate } = studentsController;
const { certificateSchema } = certificateSchemas;
 

studentsRouter.post('/:studentId/certificate',validateSchema(certificateSchema), createCertificate);

export default studentsRouter;