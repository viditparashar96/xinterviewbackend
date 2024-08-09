import { Request, Response } from "express";
import { createUser, getUser } from "../services/user.service";
import { IUser } from "../types";

export class User {
  constructor() {
    console.log("User class");
  }

  create = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;

      //   const validation = UserValidationSchema.validate({ name, email });

      //   console.log()

      // Checking if user already exisit or not

      const existedUser: IUser = await getUser({ email }); // fix type
      if (existedUser) {
        return res.status(400).json({ msg: "user already exist!!" });
      }

      const user = await createUser({ name, email });
      console.log(user);

      return res.status(201).json({ msg: "User created", user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "something went wrong!" });
    }
  };
}
