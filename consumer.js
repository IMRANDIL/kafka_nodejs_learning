const { Kafka } = require("kafkajs");

(async () => {
  try {
    const kafka = new Kafka({
      clientId: "learning_kafka",
      brokers: ["localhost:9092"], // Replace with your Kafka broker address
    });

    const consumer = kafka.consumer({
      groupId: "test-group",
    });
    console.log("Connecting>>>>>>>>>>>>>>>>>");
    await consumer.connect();
    console.log("Connected>>>>>>>>>>>>>>>>>>>");

    await consumer.subscribe({
      topic: "LearningKafka",
      fromBeginning: true, // if you want from the start
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Recieved msg ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
