import type { Knex } from "knex";
import { urlSchema } from "../schemas/url.schema";
import { userSchema } from "../schemas/user.schema";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", userSchema)
    .createTable("urls", urlSchema);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("urls");
}
