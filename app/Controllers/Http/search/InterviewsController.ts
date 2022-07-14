/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import MagicLink from 'App/Models/auth/MagicLink'
import User from 'App/Models/auth/User'
import Person from 'App/Models/prte_person/Person'
import Interview from 'App/Models/search/Interview'
import Journey from 'App/Models/search/Journey'

export default class InterviewsController {
  public async get_interviewables({ response }: HttpContextContract) {
    const result = []
    const journeys = await Journey.all()
    if (journeys) {
      ;(await journeys).forEach
      const row = { key: Journey.id, value: Journey.name, type: Journey }
      result.push(row)
      return response.status(200).json(result)
    }
  }

  public async index({ response, request }: HttpContextContract) {
    /*  Filtros de pesquisa
     Pesquisa por nome da pessoa, nome do curso, e nome da classe. */
    const query = request.input('filter')
    const interviews = await Interview.query().preload('person')
    if (query) {
      const person = await Person.query()
        .where('people.name', 'LIKE', `%${query}%`)
        .orWhere('people.email', 'LIKE', `%${query}%`)
      return response.status(200).json(person)
    }
    /*    if (query) {
      const journey = await Journey.query().where('journeys.id', 'LIKE', `%${query}%`)
      return response.status(200).json(journey)
    } */
    return response.status(200).json(interviews)
  }

  public async page({ request, response }: HttpContextContract) {
    //const query = request.input('filter')
    const page = request.input('page')
    const per = request.input('per')
    const interviews = await Interview.query().preload('person').paginate(page, per)

    return response.status(200).json(interviews)
  }

  public async show({ params, response }: HttpContextContract) {
    const interview = await Interview.query().preload('person').where('id_nav', params.id)
    return response.json({
      data: { attributes: { ...interview } },
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const { person_id: personId } = request.only(['person_id'])
    const person = await Person.findBy('id_nav', personId)
    if (person?.id) {
      const interview = await Interview.create({
        personId: person.id,
        ...request.only([
          'course',
          'course_class',
          'calculated_at',
          'coach_email',
          'blind_participant',
        ]),
      })
      if (await interview.save()) {
        return response.status(200).json(interview)
      } else {
        return response.status(500).json(interview)
      }
    }
    return response.status(400)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const interview = await Interview.findBy('id_nav', params.id)
    /*  const { person_id: personId } = request.only(['person_id'])
    const interview = await Person.findBy('id_nav', personId) */
    if (interview?.id) {
      if (interview)
        interview.merge(
          request.only([
            'finished',
            'course',
            'course_class',
            'calculated_at',
            'coach_email',
            'blind_participant',
          ])
        )
      interview.save()
    }
    return response.status(200).json(interview)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const interview = await Interview.findBy('id_nav', params.id)
    if (interview) interview.delete()
    response.status(200).json({ msg: 'Interview deleted successfully' })
  }
  //GET /search/interviews/:id/resendmail
  public async resendEmail({ response, request, params }: HttpContextContract) {
    const { person_id: personId } = request.only(['person_id'])
    const interview = await Interview.query().preload('person').where('id_nav', params.id)
    const magiclink = await MagicLink.findBy('id_nav', params.id)
    if (personId) {
      const message = await Interview.find({
        ...request.only(['person_id']),
      })
      return response.status(200).json(message)
    }
    return response.status(200).json(interview)
  }
  //POST legacy/search/interviews/bulk
  public async bulk({ request, response}: HttpContextContract) {
    const resultOk: any[]= []
    const resultError: any[] = []
    const { person_id: personId } = request.only(['person_id'])
    const interview = await Interview.query().preload('person')
    const auth = await User.query().select('email')
    if (auth?.id) {
      const chekInterview = await Interview.find({
        ...request.only([
          'person_id',
          'course',
          'course_class',
          'calculated_at',
          'coach_email',
          'blind_participant',
        ]),
      })
      if (chekInterview!) {
        const newInterview = await Interview.create({
          ...request.only([
            'person_id',
            'course',
            'course_class',
            'calculated_at',
            'coach_email',
            'blind_participant',
          ]),
        })
        if(await newInterview?.save()){
          resultOk.push(newInterview)
        } else{
          resultError.push(interview)
        return response.status(400).json({msg: 'Erro ao criar a entrevista'})
      }
    }
  }
  const auths = await User.query().select('email')
  if(auths){
    const interview = 'Email já utlizado por outro usuário.'
    resultError.push(interview)
  } else {
    const newPerson = await Person.create({
      ...request.only([
      'name',
      'locale',
    ]),
  })
  const authUser = await User.create({
    ...request.only([
      'username',
      'email',
      'password'
    ]),
  })
   personId.push(newPerson)
  }
  if(personId?.nil) {
    const newInterview = await await Interview.create({
      ...request.only([
        'person_id',
        'course',
        'course_class',
        'calculated_at',
        'coach_email',
        'blind_participant',
      ]),
    })
    if(await newInterview?.save()){
      resultOk.push(newInterview)
    } else{
      const interview = 'Erro ao criar a entrevista'
      resultError.push(interview)
    return response.status(400).json({msg: 'Erro ao criar a entrevista'})
  }
  }
  return response.status(200).json({resultOk, resultError})
}

  public async statistics({ response }: HttpContextContract) {
    const totalInterviews = await Database.from('interviews').count('')
    const finalized = Interview.query().where({ finished: true }).count('*').join
    const notFinalized = Interview.query()
      .where(['created_at <> updated_at and finished <> true'])
      .count('*').join
    return response.json({
      total: {
        totalInterviews,
        finalized: { finalized },
        not_finalized: { notFinalized },
      },
    })
  }
}
