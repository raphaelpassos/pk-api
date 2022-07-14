import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Interview from 'App/Models/search/Interview'
import User from './User'

export default class MagicLink extends BaseModel {
  public static connection = 'pg'
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Interview)
  public interview: BelongsTo<typeof Interview>

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: false, serializeAs: 'id' })
  public id_nav: string

  @column()
  public magic_hash: string

  @column.dateTime({ autoCreate: true })
  public validity: DateTime

  @column()
  public interviewId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(magiclink: MagicLink) {
    magiclink.id_nav = uuid()
  }
}
