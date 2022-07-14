import { DateTime } from 'luxon'
import { uuid } from 'uuidv4'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  afterCreate,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/auth/User'
import Journey from 'App/Models/search/Journey'
import MagicLink from 'App/Models/auth/MagicLink'
import Hash from '@ioc:Adonis/Core/Hash'
import Person from '../prte_person/Person'
export default class Interview extends BaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Journey)
  public journey: BelongsTo<typeof Journey>

  @belongsTo(() => Person)
  public person: BelongsTo<typeof Person>

  @hasOne(() => MagicLink)
  public MagicLink: HasOne<typeof MagicLink>

  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: true, serializeAs: 'id' })
  public id_nav: string

  @column()
  public personId: number

  @column()
  public user_id: number

  @column()
  public journeyId: number

  @column()
  public course: string

  @column()
  public course_class: string

  @column()
  public calculated_at: DateTime

  @column()
  public coach_email: string

  @column()
  public blind_participant: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(interview: Interview) {
    interview.id_nav = uuid()
  }

  @afterCreate()
  public static async createMagicLink(interview: Interview) {
    const findInterview = await Interview.findBy('id_nav', interview.id_nav)
    const hash = await Hash.make(interview.id_nav)
    const [, formattedHash] = hash.split('r=')
    console.log(findInterview!.id)
    const magicLink = await MagicLink.create({
      magic_hash: formattedHash.split('/').join(''),
      interviewId: findInterview!.id,
    })
  }
}
