import express from "express";
import { User } from "../controllers/user.controller";

const router = express.Router();

const user = new User();

router.route("/create").post(user.create);

export default router;
