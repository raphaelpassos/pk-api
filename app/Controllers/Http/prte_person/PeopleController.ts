import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/auth/User'
import Person from 'App/Models/prte_person/Person'

export default class PeopleController {
  //GET legacy/prte_person/people
  public async index({ response }: HttpContextContract) {
    const people = await Person.query(User)
    return response.status(200).send(people)
  }
  //GET /prte_person/people/page?page=:page&per=:per
  public async page({ request, response }: HttpContextContract) {
    const query = request.input('filter')
    const page = request.input('page')
    const per = request.input('per')
    if (query) {
      const person = await Person.query()
        .where('name', 'like', `%${query}%`)
        .orWhere('people.email', 'LIKE', `%${query}%`)
        .paginate(page, per)
      return response.status(200).json(person)
    }
    const person = await Person.query().paginate(page, per)
    return response.status(200).json(person)
  }
  //GET /prte_person/people/1
  public async show({ response, params }: HttpContextContract) {
    const person = await Person.find(params.id)
    return response.status(200).json(person)
    /* const userSend = await User.findBy('person_id', 2)
    return response.status(200).send({
      data: { ...userSend },
    }) */
  }
  //POST /prte_person/people
  public async store({ request, response }: HttpContextContract) {
    //authorize Type
    /*  const auth = User.findBy('email',person.email) */
    /*  const { person_id: personId } = request.only(['person_id'])
    const person = await Person.findBy('id_nav', personId)
    if (person?.id) { */
    const { name, email, locale } = request.only(['name', 'email', 'locale'])
    if (!name || !email || !locale) {
      return response.status(400)
    }
    const person = await Person.create({
      ...request.only(['name', 'username', 'email', 'locale']),
    })
    return response.status(200).json(person)

    /*     if (await person.save()) {
      const auth = User.create({
        username: person.username,
        password: person.password,
        email: person.email,
        person_id: person.id,
      }) */
    /*   else {
        return response.status(500).json(person)
      } */
  }
  //PATCH/PUT /prte_person/people/1
  public async update({ params, request, response }: HttpContextContract) {
    const person = await Person.findBy('id_nav', params.id)
    if (person?.id) {
      if (person) person.merge(request.only(['name', 'locale']))
      person.save()
    }
    return response.status(200).json(person)
  }
  //DELETE /prte_person/people/1
  public async destroy({ response, params }: HttpContextContract) {
    //authorize Type
    const person = await Person.findBy('id_nav', params.id)
    if (person?.id) {
      if (person) person.delete()
      return response.status(200).json({ msg: 'People deleted successfully' })
    }
  }
  public async me({ response, auth }: HttpContextContract) {
    //const auth = await User.findBy('person_id', 2)
    /* return response.status(200).send({
      data: { ...userSend },
    }) */
    if (auth.user) {
      const userSend = await User.findBy('id', auth.user?.id)
      return response.json({
        data: { ...userSend?.serialize(), attributes: { ...userSend?.serialize() } },
      })
    } else {
      return response.status(404).json({
        error: 'Auth user not found.',
        status: 404,
      })
    }
  }
  //GET prte_person/people/admins/page?page=:page&per=:per
  public async admins({ request, params, auth }: HttpContextContract) {
    /* const person = await Person.apply(User).where('auth_users.role = 1') */
    if (params) {
      const page = request.input('page')
      const per = request.input('per')
      /* const person = await User.query().paginate(page, per) */
    }
  }

  public async set_person({ params }: HttpContextContract) {
    const person = Person.find(params.id)
  }

  public async person_params({}: HttpContextContract) {
    const params = Person.findByOrFail('name', 'locale')
  }
}
