import amqp from 'amqplib';
import { certificateServices } from '../services/index.js';

export async function sendToQueue(certificateId) {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    const queue = 'certificate';

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify({id: certificateId})));

    setTimeout(() => {
        connection.close();
    }, 500);
}

export async function consumeQueue() {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    const queue = 'certificate';

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.consume(queue, async message => {
        const certificateData = JSON.parse(message.content.toString());
        
        await certificateServices.createCertificatePdf(certificateData.id);

        channel.ack(message);
    });
}