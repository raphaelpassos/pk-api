import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

import Message from 'App/Models/outputs/Message'

export default class MessageResponse extends BaseModel {
  @hasMany(() => Message)
  public message: HasMany<typeof Message>

  public static connection = 'pg'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: true, serializeAs: 'id' })
  public id_nav: string

  @column()
  public message_id: string

  @column()
  public response: string

  @column()
  public response_raw: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(messageresponse: MessageResponse) {
    messageresponse.id_nav = uuid()
  }
}
