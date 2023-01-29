import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
import db from "./database/database.js";
import deleteSessions from "./controllers/sessionController.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(router);

setInterval(deleteSessions, 60000);

const adminExist = await db.collection("admin").findOne({
  role: "admin",
});
if (!adminExist) {
  await db.collection("admin").insertOne({
    role: "admin",
    email: "admin@gmail.com",
    pwd: "admin",
    income: 0,
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
