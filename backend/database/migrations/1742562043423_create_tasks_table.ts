import { castle } from '#config/castle'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = castle.table.task()

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments('id')

      t.boolean('important').notNullable().defaultTo(false)

      t.string('title').notNullable()

      t.text('body')

      t.integer('user_id')
        .unsigned()
        .references(castle.table.user('id'))
        .notNullable()
        .onDelete('CASCADE')

      t.timestamp('created_at')
      t.timestamp('updated_at')
      t.timestamp('completed_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
