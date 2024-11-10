import amqp from 'amqplib';
import { certificateRepository } from '../repositories';

export async function sendToQueue(user) {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    const queue = 'certificate';

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));

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
        const user = JSON.parse(message.content.toString());
        
        await certificateRepository.createCertificate(user);

        channel.ack(message);
    });
}