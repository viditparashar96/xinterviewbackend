import dotenv from "dotenv";
dotenv.config();

export const env_config = {
  port: process.env.PORT || 5000,
};
