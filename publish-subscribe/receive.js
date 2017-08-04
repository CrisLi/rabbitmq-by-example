const amqp = require('amqplib');

const exchange = 'publish-subscribe';

const receive = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertExchange(exchange, 'fanout');
  const ok = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(ok.queue, exchange, '');
  await channel.consume(ok.queue, (msg) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
};

receive();
