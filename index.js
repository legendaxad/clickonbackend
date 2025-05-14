import cors from "cors";
import express from "express";
import { connectDB } from "./src/config/database.config.js";

import { errorMiddleware } from "./src/middleware/error.middleware.js";
import routeR from "./src/routes/index.js";

const server = express();

void connectDB();

server.use(cors({ credentials: true, origin: "*" }));
server.use(express.json());
server.use("/", routeR);
server.use(errorMiddleware);

server.listen(8080, () => {
  console.log("server running 8080😏");
});
