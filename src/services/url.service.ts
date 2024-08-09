import knex from "../configs/db-config";

export const getexistingUrl = async ({
  original_url,
  user_id,
}: {
  original_url: string;
  user_id: number;
}) => {
  try {
    const url = await knex
      .select("*")
      .from("urls")
      .where("original_url", original_url)
      .andWhere("urls.user_id", user_id)
      .then((output) => output[0]);

    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUrl = async ({
  original_url,
  user_id,
  shorten_url,
}: {
  original_url: string;
  user_id: number;
  shorten_url: string;
}) => {
  try {
    const createdUser = await knex("urls")
      .insert({ original_url, user_id, shorten_url })
      .returning("*")
      .then((output) => output[0]);

    return createdUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOriginalUrlByShortenUrl = async (id: string) => {
  try {
    console.log(id, "in services");
    const foundedOriginalUrl = knex
      .select("*")
      .from("urls")
      .where("shorten_url", id)
      .then((output) => output[0]);

    return foundedOriginalUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const increaseClickCout = async (id: string) => {
  try {
    const foundedOriginalUrlClick = await knex
      .select("*")
      .from("urls")
      .where("shorten_url", id)
      .returning("*")
      .then((output) => output[0]);

    const foundedOriginalUrl = knex
      .select("*")
      .from("urls")
      .increment("click_count")
      .where("shorten_url", id)
      .returning("*")
      .then((output) => output[0]);

    return foundedOriginalUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
