import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/outputs/Message'

export default class MessagesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const per = request.input('per')
    const messages = await Message.query().paginate(page, per)
    response.status(200).json(messages)
  }

  public async show({ params, response }: HttpContextContract) {
    const message = await Message.find(params.id)
    response.status(200).json(message)
  }

  public async store({ request, response }: HttpContextContract) {
    const message = await Message.create(
      request.only([
        'id_nav',
        'subject',
        'body',
        'emitter_user_id',
        'receiver_user_id',
        'reply_to',
        'message_status_id',
        'channel_id',
        'external_id',
        'alternative_receiver',
      ])
    )
    message.save()
    response.status(200).json(message)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const message = await Message.find(params.id)

    if (message) {
      message.merge(
        request.only([
          'id_nav',
          'subject',
          'body',
          'emitter_user_id',
          'receiver_user_id',
          'reply_to',
          'message_status_id',
          'channel_id',
          'external_id',
          'alternative_receiver',
        ])
      )
      message.save()
    }
    return response.status(200).json(message)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const message = await Message.find(params.id)
    if (message) message.delete()
    response.status(200).json({ msg: 'Message deleted successfully' })
  }
}
