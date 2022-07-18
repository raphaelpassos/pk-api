import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Channel from 'App/Models/outputs/Channel'

export default class ChanellsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const per = request.input('per')
    const channels = await Channel.query().paginate(page, per)
    response.status(200).json(channels)
  }

  public async show({ params, response }: HttpContextContract) {
    const channel = await Channel.find(params.id)
    response.status(200).json(channel)
  }

  public async store({ request, response }: HttpContextContract) {
    const channel = await Channel.create(request.only(['id_nav', 'name', 'description']))
    channel.save()
    response.status(200).json(channel)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const channel = await Channel.find(params.id)
    if (channel) {
      channel.merge(request.only(['id_nav', 'name', 'description']))
      channel.save()
    }
    return response.status(200).json(channel)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const channel = await Channel.find(params.id)
    if (channel) channel.delete()
    response.status(200).json({ msg: 'Channel deleted successfully' })
  }
}
