import amqp from 'amqplib';

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