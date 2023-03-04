import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projects";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("selesai").defaultTo(0);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
