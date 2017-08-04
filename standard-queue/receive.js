const amqp = require('amqplib');

const q = 'hello';

const receive = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  await channel.consume(q, (msg) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
};

receive();
