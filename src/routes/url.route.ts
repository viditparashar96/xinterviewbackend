import express from "express";
import { Url } from "../controllers/url.controller";

const router = express.Router();

const url = new Url();

router.route("/create").post(url.create);
router.route("/hit/:id").get(url.hit);
router.route("/allurls/:user_id").get(url.getallurlsbyuserid);

export default router;
