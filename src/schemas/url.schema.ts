export const urlSchema = (table: any) => {
  table.increments("id").primary().unique();
  table.string("original_url").notNullable();
  table.string("shorten_url").notNullable();
  table.integer("click_count");
  table.integer("user_id").references("id").inTable("users");
  table.timestamps(true, true);
};
