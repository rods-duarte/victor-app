
import amqp from 'amqplib';
import { certificateRepository } from "../repositories/index.js";

export async function createCertificate(certificateData) {
    const certificate = await certificateRepository.createCertificate(certificateData);

    sendToQueue({certificate: certificate.rows[0], user: certificateData.user});
}

export async function sendToQueue(data) {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    const queue = 'certificate';

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

    setTimeout(() => {
        connection.close();
    }, 500);
}