import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

import User from 'App/Models/auth/User'
import MessageResponse from 'App/Models/outputs/MessageResponse'
import MessageStatus from 'App/Models/outputs/MessageStatus'
import Channel from 'App/Models/outputs/Channel'

export default class Message extends BaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => MessageResponse)
  public messageresponse: HasMany<typeof MessageResponse>

  @belongsTo(() => MessageStatus)
  public messagestatus: BelongsTo<typeof MessageStatus>

  @belongsTo(() => Channel)
  public channel: BelongsTo<typeof Channel>

  public static connection = 'pg'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: true, serializeAs: 'id' })
  public id_nav: string

  @column()
  public subject: string

  @column()
  public body: string

  @column()
  public emitter_user_id: string

  @column()
  public receiver_user_id: string

  @column()
  public reply_to: string

  @column()
  public message_status_id: string

  @column()
  public channel_id: string

  @column()
  public external_id: string

  @column.dateTime({ autoCreate: true })
  public sent_at: DateTime

  @column()
  public alternative_receiver: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(message: Message) {
    message.id_nav = uuid()
  }
}
