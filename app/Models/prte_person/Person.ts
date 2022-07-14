import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  beforeCreate,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Interview from '../search/Interview'
import { uuid } from 'uuidv4'
import User from '../auth/User'

export default class Person extends BaseModel {
  @belongsTo(() => Interview)
  public interview: BelongsTo<typeof Interview>

  @hasMany(() => User)
  public user: HasMany<typeof User>

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: false, serializeAs: 'id' })
  public id_nav: string

  @column()
  public personId: number

  @column()
  public name: string

  @column()
  public password: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public user_id: number

  @column()
  public locale: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(person: Person) {
    person.id_nav = uuid()
  }
}
