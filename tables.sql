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
);

CREATE TABLE certificates(
    "id" SERIAL PRIMARY KEY,
    "nome_curso" CHAR(100) NOT NULL,
    "data_inicio" DATE NOT NULL,
    "data_fim" DATE NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "pdf_path" CHAR(100) NOT NULL,
    "status" CHAR(100) DEFAULT 'pendente',
    "descricao" TEXT NOT NULL,
    "user_id" INTEGER REFERENCES users(id),
    "created_at" TIMESTAMP DEFAULT NOW()
);
