import { DateTime } from 'luxon'
import { uuid } from 'uuidv4'
import {
  beforeCreate,
  BaseModel,
  column,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Interview from '../search/Interview'
import Person from '../prte_person/Person'
import SouthFaceQuiz from '../south_face/SouthFaceQuiz'
import NorthFaceQuiz from '../north_face/NorthFaceQuiz'
import EastFaceQuiz from '../east_face/EastFaceQuiz'
import WestFaceQuiz from '../west_face/WestFaceQuiz'

export default class Journey extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @belongsTo(() => SouthFaceQuiz)
  public southFaceQuiz: BelongsTo<typeof SouthFaceQuiz>

  @belongsTo(() => NorthFaceQuiz)
  public northFaceQuiz: BelongsTo<typeof NorthFaceQuiz>

  @belongsTo(() => EastFaceQuiz)
  public eastFaceQuiz: BelongsTo<typeof EastFaceQuiz>

  @belongsTo(() => WestFaceQuiz)
  public westFaceQuiz: BelongsTo<typeof WestFaceQuiz>

  @hasMany(() => Interview)
  public interview: HasMany<typeof Interview>

  @hasMany(() => Person)
  public person: HasMany<typeof Person>

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: false, serializeAs: 'id' })
  public idNav: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public north_face_quiz_id: number

  @column()
  public south_face_quiz_id: number

  @column()
  public east_face_quiz_id: number

  @column()
  public west_face_quiz_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public available_from: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public available_until: DateTime

  @beforeCreate()
  public static assignUuid(journey: Journey) {
    journey.idNav = uuid()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
