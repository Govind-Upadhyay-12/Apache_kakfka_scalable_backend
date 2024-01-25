import express from "express";
import router from "./addData.js";
import {kafka} from "./client.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);

async function init() {
  try {
    const admin = kafka.admin();
    console.log("Admin connecting...");
    await admin.connect();
    console.log("Admin Connection Success...");

    console.log("Creating Topic [rider-updates]");
    await admin.createTopics({
      topics: [
        {
          topic: "rider-updates",
          numPartitions: 2,
        },
      ],
    });
    console.log("Topic Created Success [rider-updates]");

    console.log("Disconnecting Admin..");
    await admin.disconnect();
  } catch (error) {
    console.error("Error initializing Kafka:", error);
  }
}

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  init();
});
