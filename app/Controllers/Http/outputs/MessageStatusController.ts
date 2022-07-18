import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageStatus from 'App/Models/outputs/MessageStatus'

export default class MessageStatusController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const per = request.input('per')
    const messagestatus = await MessageStatus.query().paginate(page, per)
    response.status(200).json(messagestatus)
  }

  public async show({ params, response }: HttpContextContract) {
    const messagestatus = await MessageStatus.find(params.id)
    response.status(200).json(messagestatus)
  }

  public async store({ request, response }: HttpContextContract) {
    const messagestatus = await MessageStatus.create(
      request.only(['id_nav', 'name', 'description', 'external_id'])
    )
    messagestatus.save()
    response.status(200).json(messagestatus)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const messagestatus = await MessageStatus.find(params.id)

    if (messagestatus) {
      messagestatus.merge(request.only(['id_nav', 'name', 'description', 'external_id']))
      messagestatus.save()
    }
    return response.status(200).json(messagestatus)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const messagestatus = await MessageStatus.find(params.id)
    if (messagestatus) messagestatus.delete()
    response.status(200).json({ msg: 'MessageStatus deleted successfully' })
  }
}
