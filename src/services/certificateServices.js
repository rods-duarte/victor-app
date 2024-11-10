
import path from "path";
import fs from "fs";
import ejs from "ejs";
import htmlPdf from "html-pdf";
import { fileURLToPath } from "url";
import { certificateWorker } from "../workers/index.js";
import { certificateRepository } from "../repositories/index.js";

const { sendToQueue } = certificateWorker;

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function createCertificate(certificateData) {
    const certificate = await certificateRepository.createCertificate(certificateData);

    sendToQueue(certificate.id);
}

export async function createCertificatePdf(certificateId) {
    const templatePath = path.join(__dirname, '../views/certificado.ejs');
    const outputPath = path.join(__dirname, `../certificados/certificado-${certificateId}.pdf`);

    const certificateData = await certificateRepository.getCertificateById(certificateId);
    console.log("🚀 ~ createCertificatePdf ~ certificateData.rows[0]:", certificateData.rows[0])

    const template = fs.readFileSync(templatePath, 'utf-8');
    const certificateHtml = ejs.render(template, certificateData.rows[0]);

    htmlPdf.create(certificateHtml).toFile(outputPath, async (err, res) => {
        await certificateRepository.addPdfPath(certificateId, outputPath);
    })
}