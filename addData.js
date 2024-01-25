import express from "express";
import {kafka} from "./client.js"
const router = express.Router();

router.post("/addData", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    const producer = kafka.producer();

    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });

    console.log("Data sent successfully");

    await producer.disconnect();
    console.log("Producer disconnected");

    res.status(200).json({ success: true, message: "Data sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router
