import knex from "../configs/db-config";
import { IUser } from "../types";

export const getUser = async ({ email }: { email: string }): Promise<IUser> => {
  try {
    const user = await knex
      .select("*")
      .from("users")
      .where("email", email)
      .then((output) => output[0]);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  try {
    const createdUser = await knex("users")
      .insert({ name, email })
      .returning("*")
      .then((output) => output[0]);

    return createdUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUrlbyUserid = async ({ user_id }: { user_id: number }) => {
  try {
    const allurls = knex
      .select("*")
      .from("urls")
      .where("user_id", user_id)
      .orderBy("created_at", "desc")
      .then((output) => output);

    return allurls;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
