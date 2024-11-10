import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routers/index.js';
import {fileURLToPath} from 'url';
import path from 'path';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public'))); 
app.use(cors());
app.use(express.json());

app.use('/', router);

app.get('/heartbeat', (req, res) => {
    res.send('Server is alive');
});

// get, post, put, delete 


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})