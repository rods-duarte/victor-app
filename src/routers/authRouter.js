import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { authSchemas } from '../schemas/index.js';
import { schemaMiddlewares } from '../middlewares/index.js';

const authRouter = Router();
const { register, login } = authController;
const { registerSchema, loginSchema } = authSchemas;
const { validateSchema } = schemaMiddlewares;

authRouter.post('/register', validateSchema(registerSchema), register);

authRouter.post('/login', validateSchema(loginSchema), login);

export default authRouter;