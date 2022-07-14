import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Interviews extends BaseSchema {
  protected tableName = 'interviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('id_nav').unique()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('person_id').unsigned().references('id').inTable('people').onDelete('CASCADE')
      table.string('course').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
