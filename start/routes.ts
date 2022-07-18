import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
  Route.post('/login', 'AuthController.login')
  Route.get('/auth/magiclink/:hash', 'AuthController.magiclink')
}).namespace('App/Controllers/Http/auth')

Route.group(() => {
  Route.resource('channels', 'ChannelsController').apiOnly()
  Route.resource('messagestatus', 'MessageStatusController').apiOnly()
  Route.resource('messages', 'MessagesController').apiOnly()
  Route.resource('messagesresponse', 'MessageResponsesController').apiOnly()
  Route.resource('templates', 'TemplatesController').apiOnly()
}).namespace('App/Controllers/Http/outputs')

Route.group(() => {
  Route.get('search/journeys/page', 'JourneysController.page')
  Route.get('search/journeys/:id', 'JourneysController.show')
  Route.get('search/journeys', 'JourneysController.index')
  Route.post('search/journeys', 'JourneysController.store')
  Route.put('search/journeys/:id', 'JourneysController.update')
  Route.delete('search/journeys/:id', 'JourneysController.destroy')
  Route.get('legacy/search/interviews/statistics', 'InterviewsController.statistics')
  Route.get('legacy/search/interviews', 'InterviewsController.index')
  Route.get('legacy/search/interviews/page', 'InterviewsController.page')
  Route.post('legacy/search/interviews', 'InterviewsController.store')
  Route.get('legacy/search/interviews/interviewables', 'InterviewsController.get_interviewables')
  Route.get('legacy/search/interviews/:id', 'InterviewsController.show')
  Route.put('legacy/search/interviews/:id', 'InterviewsController.update')
  Route.delete('legacy/search/interviews/:id', 'InterviewsController.destroy')
  Route.get('legacy/search/interviews/:id/resendmail', 'InterviewsController.resendEmail')
  Route.post('search/interviews/bulk', 'InterviewsController.bulk')
}).namespace('App/Controllers/Http/search')

Route.group(() => {
  Route.get('legacy/prte_person/people', 'PeopleController.index')
  Route.get('legacy/prte_person/people/me', 'PeopleController.me').middleware('auth')
  Route.get('legacy/prte_person/people/page', 'PeopleController.page')
  Route.post('legacy/prte_person/people', 'PeopleController.store').middleware('auth')
  Route.get('legacy/prte_person/people/:id', 'PeopleController.show')
  Route.put('legacy/prte_person/people/:id', 'PeopleController.update')
  Route.delete('legacy/prte_person/people/:id', 'PeopleController.destroy')
}).namespace('App/Controllers/Http/prte_person')

