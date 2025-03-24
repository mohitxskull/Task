import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { squid } from '#config/squid'
import cache from '@adonisjs/cache/services/main'
import { castle } from '#config/castle'
import { serializeDT } from '@folie/castle/helpers'
import { ModelCache } from '@folie/castle'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Task extends BaseModel {
  static table = castle.table.task()

  // Serialize =============================

  static $serialize(row: Task) {
    return {
      ...row.$toJSON(),

      id: squid.task.encode(row.id),
      userId: squid.user.encode(row.userId),

      createdAt: serializeDT(row.createdAt),
      updatedAt: serializeDT(row.updatedAt),
      completedAt: serializeDT(row.completedAt),
    }
  }

  $serialize() {
    return Task.$serialize(this)
  }

  $toJSON() {
    return {
      id: this.id,

      important: this.important,

      title: this.title,
      body: this.body,

      userId: this.userId,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      completedAt: this.completedAt,
    }
  }

  // Cache =============================

  static $cache() {
    return new ModelCache(Task, cache.namespace(this.table), ['metric'])
  }

  $cache() {
    return Task.$cache().row(this)
  }

  // Columns =============================

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare important: boolean

  @column()
  declare title: string

  @column()
  declare body: string | null

  @column()
  declare userId: number

  // DateTime =============================

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare completedAt: DateTime | null

  // Hooks =============================

  // Relations =============================

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Extra ======================================
}
