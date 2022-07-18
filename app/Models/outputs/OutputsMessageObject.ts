import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OutputsMessageObject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ isPrimary: true, serializeAs: 'id' })
  public id_nav: string

  @column()
  public subject: string

  @column()
  public body: string

  @column()
  public emitter_type: string

  @column()
  public emitter_id: string

  @column()
  public receiver_type: string

  @column()
  public receiver_id: string

  @column()
  public reply_to: string

  @column()
  public outputs_message_status_id: string

  @column()
  public outputs_channel_id: string

  @column()
  public external_id: string

  @column()
  public sent_at: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
