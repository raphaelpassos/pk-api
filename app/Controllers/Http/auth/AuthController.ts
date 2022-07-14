import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MagicLink from 'App/Models/auth/MagicLink'
import Interview from 'App/Models/search/Interview'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { username, password } = request.only(['username', 'password'])
    try {
      const { token } = await auth.use('api').attempt(username, password)
      response.status(200).send({ jwt: token })
    } catch (err) {
      return response.status(err.status || 500).send({
        errors: [
          {
            message: err.message,
          },
        ],
      })
    }
  }

  public async magiclink({ response, params, auth }: HttpContextContract) {
    const { hash } = params

    const magiclink = await MagicLink.findBy('magic_hash', hash)

    if (!magiclink) {
      return response.status(400).send({ errors: [{ message: 'Magiclink inválido' }] })
    }

    const interview = await Interview.first()

    if (!interview) {
      return response.status(400).send({ errors: [{ message: 'Entrevista inválida' }] })
    }

    const token = await auth.use('api').loginViaId(interview.user_id)

    return {
      interview,
      user: token,
    }
  }
}
