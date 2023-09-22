const { Kafka, Partitioners } = require("kafkajs");

const msg = process.argv[2]

if(!msg) {
    console.error('Please put the name after producer.js!');
    process.exit(0)
}

(async () => {
  try {
    const kafka = new Kafka({
      clientId: "learning_kafka",
      brokers: ["localhost:9092"], // Replace with your Kafka broker address
    });

    const producer = kafka.producer();
    console.log("Connecting>>>>>>>>>>>>>>>>>");
    await producer.connect();
    console.log("Connected>>>>>>>>>>>>>>>>>>>");
    const partition = msg[0].toUpperCase() < "N" ? 0 : 1;
    const result = await producer.send({
      topic: "LearningKafka",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
console.log(`sent successfully......${JSON.stringify(result)}`)
    await producer.disconnect();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
})();
