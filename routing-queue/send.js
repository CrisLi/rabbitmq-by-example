const amqp = require('amqplib');

const exchange = 'routing';
const count = process.argv[2] || 3;

const send = async (conn, type) => {
  const msg = {
    content: 'All to Know',
    timestamp: Date.now()
  };
  const channel = await conn.createChannel();
  await channel.assertExchange(exchange, 'direct');
  await channel.publish(exchange, type ? 'Even' : 'Odd', Buffer.from(JSON.stringify(msg)));
  await channel.close();
};

const sendAll = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(send(conn, i % 2 === 0));
  }
  await Promise.all(result);
  conn.close();
};

sendAll();
