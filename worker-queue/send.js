const amqp = require('amqplib');

const q = 'worker-queue';
const count = process.argv[2] || 5;

const send = async () => {
  const msg = {
    content: 'Big News',
    timestamp: Date.now()
  };
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  await channel.sendToQueue(q, Buffer.from(JSON.stringify(msg)));
  await channel.close();
  conn.close();
};

for (let i = 0; i < count; i++) {
  setTimeout(send, 500);
}
