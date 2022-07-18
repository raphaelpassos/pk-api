import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Template extends BaseModel {
  public static connection = 'pg'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: true, serializeAs: 'id' })
  public id_nav: string

  @column()
  public title: string

  @column()
  public body: string

  @column()
  public alias: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(template: Template) {
    template.id_nav = uuid()
  }
}
