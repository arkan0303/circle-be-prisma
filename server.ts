import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import Routes from "./src/routes";
import prisma from "./src/db";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/api/v1", Routes);

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`server is running on port ${PORT}`);
});
