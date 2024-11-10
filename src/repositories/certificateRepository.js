import db from '../config/database.js';

export function createCertificate(certificateData) {
    const { nomeCurso, dataInicio, dataFim, cargaHoraria, descricao, userId } = certificateData;
    const query = `INSERT INTO certificates (nome_curso, data_inicio, data_fim, carga_horaria, descricao, user_id) VALUES ($1, $2, $3, $4, $5, $6)`;

    return db.query(query, [nomeCurso, dataInicio, dataFim, cargaHoraria, descricao, userId]);
}

export function getCertificateById(certificateId) {
    const query = `SELECT certificates.*, users.* FROM certificates LEFT JOIN users ON users.id = certificates.user_id WHERE certificates.id = $1;`;

    return db.query(query, [certificateId]);
}

export function addPdfPath(certificateId, pdfPath) {
    const query = `UPDATE certificates SET pdf_path = $1 WHERE id = $2;`;

    return db.query(query, [pdfPath, certificateId]);
}