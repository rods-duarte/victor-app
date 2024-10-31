CREATE TABLE users(
    "id" SERIAL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "senha" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW()
)