import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Journey from 'App/Models/search/Journey'

export default class JourneysController {
  public async index({ response }: HttpContextContract) {
    const journeys = await Journey.all()
    return response.status(200).json(journeys)
  }

  public async page({ request, response }: HttpContextContract) {
    const query = request.input('filter')
    const page = request.input('page')
    const per = request.input('per')
    if (query) {
      const journeys = await Journey.query().where('name', 'like', `%${query}%`).paginate(page, per)
      return response.status(200).json(journeys)
    }
    const journeys = await Journey.query().paginate(page, per)
    return response.status(200).json(journeys)
  }

  public async show({ params, response }: HttpContextContract) {
    const journey = await Journey.findBy('idNav', params.id)
    response.status(200).json(journey)
  }

  public async store({ request, response }: HttpContextContract) {
    const journeys = await Journey.create(
      request.only([
        'id_nav',
        'name',
        'description',
        'available_from',
        'available_until',
        'north_face_quiz_id',
        'south_face_quiz_id',
        'east_face_quiz_id',
        'west_face_quiz_id',
      ])
    )
    journeys.save()
    response.status(200).json(journeys)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const journeys = await Journey.query().preload('interview')
    const journey = await Journey.findBy('idNav', params.id)
    if (journey?.id) {
      if (journey)
        journey.merge(request.only(['name', 'description', 'available_from', 'available_until']))
      journey.save()
    }
    return response.status(200).json(journey)
  }
  public async destroy({ params, response }: HttpContextContract) {
    const journey = await Journey.findBy('id_nav', params.id)
    if (journey) journey.delete()
    response.status(200).json({ msg: 'Journey deleted successfully' })
  }
}
