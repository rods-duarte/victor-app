import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddlewares } from "../middlewares/index.js";

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesRouter = Router();
const { authenticateToken } = authMiddlewares;


pagesRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/telaLogin.html'));
})

pagesRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/telaLogin.html'));
})

pagesRouter.get('/cursos', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cursos.html'));
});

export default pagesRouter;