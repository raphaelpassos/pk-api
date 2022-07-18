import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'

export default class TemplatesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const per = request.input('per')
    const template = await Template.query().paginate(page, per)
    response.status(200).json(template)
  }

  public async show({ params, response }: HttpContextContract) {
    const template = await Template.find(params.id)
    response.status(200).json(template)
  }

  public async store({ request, response }: HttpContextContract) {
    const template = await Template.create(request.only(['id_nav', 'title', 'body', 'alias']))
    template.save()
    response.status(200).json(template)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const template = await Template.find(params.id)

    if (template) {
      template.merge(request.only(['id_nav', 'title', 'body', 'alias']))
      template.save()
    }
    return response.status(200).json(template)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const template = await Template.find(params.id)
    if (template) template.delete()
    response.status(200).json({ msg: 'Template deleted successfully' })
  }
}
