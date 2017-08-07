const amqp = require('amqplib');

const exchange = 'routing';
const type = process.argv[2] || 'Odd';

const receive = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertExchange(exchange, 'direct');
  const ok = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(ok.queue, exchange, type);
  await channel.consume(ok.queue, (msg) => {
    console.log(`[Key: ${msg.fields.routingKey}] ${msg.content.toString()}`);
    channel.ack(msg);
  });
};

receive();
