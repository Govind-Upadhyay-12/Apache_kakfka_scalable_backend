import  {kafka}  from "./client.js";

const runConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "group-1" });

  await consumer.connect();

  await consumer.subscribe({
    topics: ["rider-updates"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${consumer.groupId}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
};

runConsumer().catch((error) => {
  console.error("Error in Kafka consumer:", error);
});
