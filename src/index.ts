import cors from "cors";
import express, { Express } from "express";
import logger from "morgan";
import { env_config } from "./configs/env-configs";
import urlRouter from "./routes/url.route";
import userRouter from "./routes/user.route";
const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(logger("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/url", urlRouter);

app.get("/", (req, res) => {
  res.send("Welcome x interview");
});

app.listen(env_config.port, () => {
  console.log(`server is runinng at ${env_config.port}`);
});
