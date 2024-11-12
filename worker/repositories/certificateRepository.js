import db from '../config/database.js';

export function addPdfPath(certificateId, pdfPath) {
    const query = `UPDATE certificates SET pdf_path = $1, status = 'concluido' WHERE id = $2;`;

    return db.query(query, [pdfPath, certificateId]);
}