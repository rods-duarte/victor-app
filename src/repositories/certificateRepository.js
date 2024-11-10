import db from '../config/database.js';

export function createCertificate(user) {
    const { nome, email, senha, rg, nacionalidade, estado, dataNascimento } = user; 
    const query = `
        INSERT INTO users (nome, email, senha, rg, nacionalidade, estado, data_nascimento)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    return db.query(query, [nome, email, senha, rg, nacionalidade, estado, dataNascimento]);
}