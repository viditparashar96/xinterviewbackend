import { nanoid } from "nanoid";

export const getShortenUrl = (): string => {
  const nanourl = nanoid(7);
  return nanourl;
};
