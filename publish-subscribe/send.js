const amqp = require('amqplib');

const exchange = 'publish-subscribe';
const count = process.argv[2] || 3;

const send = async (conn) => {
  const msg = {
    content: 'All to Know',
    timestamp: Date.now()
  };
  const channel = await conn.createChannel();
  await channel.assertExchange(exchange, 'fanout');
  await channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
  await channel.close();
};

const sendAll = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(send(conn));
  }
  await Promise.all(result);
  conn.close();
};

sendAll();
