import amqp from 'amqplib';
import dotenv from 'dotenv';
import * as certificateServices from './services/certificateServices.js';

dotenv.config();

async function startWorker() {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();

    const queue = 'certificate';

    await channel.assertQueue(queue, {
        durable: true
    });

    console.log('Waiting for messages in %s', queue);

    channel.consume(queue, async (message) => {
        const content = JSON.parse(message.content.toString());
        console.log('Received message', content);

        await certificateServices.createCertificatePdf(content);

        setTimeout(() => {
            console.log('Processed message', content);
            channel.ack(message);
        }, 5000);
    });
}

startWorker().catch(console.error);