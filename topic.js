const { Kafka } = require('kafkajs');

(async () => {
  try {
    const kafka = new Kafka({
      clientId: 'learning_kafka',
      brokers: ['localhost:9092'] // Replace with your Kafka broker address
    });

    const admin = kafka.admin();
    console.log('Connecting>>>>>>>>>>>>>>>>>');
    await admin.connect();
    console.log('Connected>>>>>>>>>>>>>>>>>>>');

    // Delete the topic
    // await admin.deleteTopics({
    //   topics: ['LearningKafka']
    // });

    // Introduce a delay (e.g., 2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create a Kafka topic
    await admin.createTopics({
      topics: [
        { topic: 'LearningKafka', numPartitions: 2, replicationFactor: 1 }
      ]
    });
    console.log('Topic created>>>>>>>>>>>>>>>>');
    await admin.disconnect();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
})();
