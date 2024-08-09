export const userSchema = (table: any) => {
  table.increments("id").primary().unique();
  table.string("name").notNullable();
  table.string("email").notNullable().unique();
  table.timestamps(true, true);
};
