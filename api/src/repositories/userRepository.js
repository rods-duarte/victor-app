import db from '../config/database.js';

export function createUser(user) {
    const { nome, email, senha, rg, nacionalidade, estado, dataNascimento } = user; 
    const query = `
        INSERT INTO users (nome, email, senha, rg, nacionalidade, estado, data_nascimento)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    return db.query(query, [nome, email, senha, rg, nacionalidade, estado, dataNascimento]);
}

export function findUserByEmail(email) {
    const query = `
        SELECT * FROM users WHERE email = $1
    `;
    return db.query(query, [email]);
}

export function findUserById(id) {
    const query = `
        SELECT * FROM users WHERE id = $1
    `;
    return db.query(query, [id]);
}