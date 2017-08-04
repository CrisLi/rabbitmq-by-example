const amqp = require('amqplib');

const q = 'worker-queue';

const receive = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  await channel.prefetch(1);
  await channel.consume(q, (msg) => {
    setTimeout(() => {
      console.log(JSON.parse(msg.content.toString()));
      console.log('Job Done');
      channel.ack(msg);
    }, 1000);
  });
};

receive();
