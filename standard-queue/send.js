const amqp = require('amqplib');

const q = 'hello';

const send = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  await channel.sendToQueue(q, Buffer.from('Hello RabbitMQ'));
  await channel.close();
  conn.close();
};

send();
