import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  createUrl,
  getexistingUrl,
  getOriginalUrlByShortenUrl,
  increaseClickCout,
} from "../services/url.service";
import { getUrlbyUserid } from "../services/user.service";

export class Url {
  constructor() {
    console.log("Url classs");
  }

  create = async (req: Request, res: Response) => {
    try {
      const { original_url, user_id } = req.body;

      // Validations for req.body later

      // checking if the url is already exist in db with same user id

      const exisitUrl = await getexistingUrl({ original_url, user_id });

      if (exisitUrl) {
        return res.status(400).json({ msg: "Url already exist!!" });
      }

      let id = nanoid(10);

      const createdUrl = await createUrl({
        original_url,
        user_id,
        shorten_url: id,
      });

      if (!createdUrl) {
        return res.status(400).json({ msg: "url not created" });
      }

      return res.status(201).json({ msg: "url created", createdUrl });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "something went wrong!" });
    }
  };

  hit = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("nano id for url", id);

      const fouded_original_url = await getOriginalUrlByShortenUrl(id);

      if (!fouded_original_url) {
        return res.status(404).json({ msg: "Url not found" });
      }

      //   Fix this==>
      const increcedCount = await increaseClickCout(id);

      console.log(fouded_original_url);
      console.log(increcedCount);

      return res.status(200).json({ url: fouded_original_url.original_url });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "something went wrong!" });
    }
  };

  getallurlsbyuserid = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      // Validations later

      const userid = Number(user_id);

      const allurls = await getUrlbyUserid({ user_id: userid });

      if (allurls.length === 0) {
        return res.status(200).json({ msg: "No urls created" });
      }

      return res.status(200).json({ msg: "ok", allurls });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "something went wrong!" });
    }
  };
}
