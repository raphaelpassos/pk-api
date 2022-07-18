import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageResponse from 'App/Models/outputs/MessageResponse'

export default class MessageResponsesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const per = request.input('per')
    const messageresponse = await MessageResponse.query().paginate(page, per)
    response.status(200).json(messageresponse)
  }

  public async show({ params, response }: HttpContextContract) {
    const messageresponse = await MessageResponse.find(params.id)
    response.status(200).json(messageresponse)
  }

  public async store({ request, response }: HttpContextContract) {
    const messageresponse = await MessageResponse.create(
      request.only(['id_nav', 'message_id', 'response', 'response_raw'])
    )
    messageresponse.save()
    response.status(200).json(messageresponse)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const messageresponse = await MessageResponse.find(params.id)

    if (messageresponse) {
      messageresponse.merge(request.only(['id_nav', 'message_id', 'response', 'response_raw']))
      messageresponse.save()
    }
    return response.status(200).json(messageresponse)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const messageresponse = await MessageResponse.find(params.id)
    if (messageresponse) messageresponse.delete()
    response.status(200).json({ msg: 'MessageResponse deleted successfully' })
  }
}
