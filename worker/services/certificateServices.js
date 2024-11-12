
import path from "path";
import fs from "fs";
import ejs from "ejs";
import htmlPdf from "html-pdf";
import { fileURLToPath } from "url";
import * as certificateRepository from "../repositories/certificateRepository.js";

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createCertificatePdf(content) {
    const {certificate, user} = content;
    const templatePath = path.join(__dirname, '../templates/certificado.ejs');
    const filename = `../certificados/certificado-curso-${certificate.nome_curso.trim()}-aluno-${user.nome.trim()}-${new Date(certificate.data_fim).toLocaleDateString('pt-br').replace(/\//g, '-')}.pdf`;
    const outputPath = path.join(__dirname, filename);

    const template = fs.readFileSync(templatePath, 'utf-8');
    const certificateHtml = ejs.render(template, content);

    htmlPdf.create(certificateHtml).toFile(outputPath, async (err, res) => {
        await certificateRepository.addPdfPath(certificate.id, outputPath);
    })
}