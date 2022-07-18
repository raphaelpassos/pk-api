import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Message from 'App/Models/outputs/Message'

export default class MessageStatus extends BaseModel {
  @hasMany(() => Message)
  public message: HasMany<typeof Message>

  public static connection = 'pg'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: true, serializeAs: 'id' })
  public id_nav: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public external_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(messagestatus: MessageStatus) {
    messagestatus.id_nav = uuid()
  }
}
