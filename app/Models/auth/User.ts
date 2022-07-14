import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import {
  beforeSave,
  BaseModel,
  column,
  beforeCreate,
  hasMany,
  HasMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Interview from 'App/Models/search/Interview'
const mapRoles = new Map([
  [1, 'admin'],
  [0, 'normal'],
])

export default class User extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @hasMany(() => Interview)
  public interview: HasMany<typeof Interview>

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: false, serializeAs: 'id' })
  public id_nav: string

  @column()
  public personId: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public role: number

  @computed({ serializeAs: 'role' })
  public get roleName() {
    return mapRoles.get(this.role)
  }

  @column({ serializeAs: null })
  public password: string

  @column()
  public locale: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id_nav = uuid()
  }
}
